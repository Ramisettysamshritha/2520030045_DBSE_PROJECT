const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGNUP
const signup = async (req, res, next) => {
  try {
    const {
      full_name,
      email,
      password,
      phone
    } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Full name, email and password are required"
      });
    }

    const [existingUsers] = await db.query(
      `
      SELECT user_id
      FROM users
      WHERE email = ?
      `,
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `
      INSERT INTO users
      (
        full_name,
        email,
        password_hash,
        phone,
        role
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        full_name,
        email,
        passwordHash,
        phone || null,
        "customer"
      ]
    );

    const token = jwt.sign(
      {
        user_id: result.insertId,
        email,
        role: "customer"
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: {
        user_id: result.insertId,
        full_name,
        email,
        phone: phone || null,
        role: "customer"
      }
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN
const login = async (req, res, next) => {
  try {
    const {
      email,
      password
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const [users] = await db.query(
      `
      SELECT
        user_id,
        full_name,
        email,
        password_hash,
        phone,
        role,
        created_at
      FROM users
      WHERE email = ?
      `,
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const user = users[0];

    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        created_at: user.created_at
      }
    });
  } catch (error) {
    next(error);
  }
};

// CURRENT USER
const getCurrentUser = async (req, res, next) => {
  try {
    const [users] = await db.query(
      `
      SELECT
        user_id,
        full_name,
        email,
        phone,
        role,
        created_at
      FROM users
      WHERE user_id = ?
      `,
      [req.user.user_id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      data: users[0]
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  getCurrentUser
};
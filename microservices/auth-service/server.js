const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


// ==========================================
// MYSQL DATABASE CONNECTION
// ==========================================

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "12345",
  database: process.env.DB_NAME || "travel_package_portal",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


// ==========================================
// JWT SECRET
// ==========================================

const JWT_SECRET =
  process.env.JWT_SECRET || "travel_package_portal_secret_2026";


// ==========================================
// HOME
// ==========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    service: "Auth Microservice",
    message: "Auth Service is running"
  });
});


// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/health", async (req, res) => {
  try {

    await db.query("SELECT 1");

    res.json({
      success: true,
      service: "Auth Microservice",
      database: "connected"
    });

  } catch (error) {

    console.error("Health Check Error:", error.message);

    res.status(500).json({
      success: false,
      service: "Auth Microservice",
      database: "disconnected",
      error: error.message
    });

  }
});


// ==========================================
// SIGNUP
// ==========================================

app.post("/signup", async (req, res) => {

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
      "SELECT user_id FROM users WHERE email = ?",
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
      `INSERT INTO users
       (full_name, email, password_hash, phone, role)
       VALUES (?, ?, ?, ?, 'customer')`,
      [
        full_name,
        email,
        passwordHash,
        phone || null
      ]
    );

    const token = jwt.sign(
      {
        user_id: result.insertId,
        email: email,
        role: "customer"
      },
      JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.status(201).json({
      success: true,
      message: "Signup successful",
      token: token,
      user: {
        user_id: result.insertId,
        full_name: full_name,
        email: email,
        phone: phone || null,
        role: "customer"
      }
    });

  } catch (error) {

    console.error("Signup Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Signup failed",
      error: error.message
    });

  }

});


// ==========================================
// LOGIN
// ==========================================

app.post("/login", async (req, res) => {

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
      `SELECT
        user_id,
        full_name,
        email,
        password_hash,
        phone,
        role
       FROM users
       WHERE email = ?`,
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
      JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      success: true,
      message: "Login successful",
      token: token,
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });

  } catch (error) {

    console.error("Login Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message
    });

  }

});


// ==========================================
// VERIFY JWT TOKEN
// ==========================================

app.get("/verify", (req, res) => {

  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token required"
      });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format"
      });
    }

    const token = parts[1];

    const decoded = jwt.verify(
      token,
      JWT_SECRET
    );

    res.json({
      success: true,
      message: "Token is valid",
      user: decoded
    });

  } catch (error) {

    res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });

  }

});


// ==========================================
// START SERVER
// ==========================================

const PORT = 5001;

app.listen(PORT, async () => {

  console.log("==========================================");
  console.log("          AUTH MICROSERVICE");
  console.log("==========================================");

  console.log(
    `Auth Service running on: http://localhost:${PORT}`
  );

  try {

    const connection = await db.getConnection();

    console.log("MySQL database connected successfully");

    connection.release();

  } catch (error) {

    console.error("MySQL connection failed:");
    console.error(error.message);

  }

});
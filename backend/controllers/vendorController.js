const db = require("../config/db");


// ==========================================
// GET ALL VENDORS
// ==========================================

const getAllVendors = async (req, res, next) => {
  try {
    const [rows] = await db.query(`
      SELECT
        user_id,
        full_name,
        email,
        phone,
        role,
        created_at
      FROM users
      WHERE role = 'vendor'
      ORDER BY user_id DESC
    `);

    res.json({
      success: true,
      count: rows.length,
      data: rows
    });

  } catch (error) {
    next(error);
  }
};


// ==========================================
// CREATE VENDOR
// ==========================================

const createVendor = async (req, res, next) => {
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
        message:
          "full_name, email and password are required"
      });
    }

    const bcrypt = require("bcryptjs");

    const [existing] = await db.query(
      "SELECT user_id FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });
    }

    const passwordHash =
      await bcrypt.hash(password, 10);

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
      VALUES (?, ?, ?, ?, 'vendor')
      `,
      [
        full_name,
        email,
        passwordHash,
        phone || null
      ]
    );

    res.status(201).json({
      success: true,
      message: "Vendor created successfully",
      vendor_id: result.insertId
    });

  } catch (error) {
    next(error);
  }
};


// ==========================================
// UPDATE VENDOR
// ==========================================

const updateVendor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      full_name,
      phone
    } = req.body;

    const [result] = await db.query(
      `
      UPDATE users
      SET
        full_name = COALESCE(?, full_name),
        phone = COALESCE(?, phone)
      WHERE user_id = ?
        AND role = 'vendor'
      `,
      [
        full_name || null,
        phone || null,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found"
      });
    }

    res.json({
      success: true,
      message: "Vendor updated successfully"
    });

  } catch (error) {
    next(error);
  }
};


// ==========================================
// DELETE VENDOR
// ==========================================

const deleteVendor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      `
      DELETE FROM users
      WHERE user_id = ?
        AND role = 'vendor'
      `,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found"
      });
    }

    res.json({
      success: true,
      message: "Vendor deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};


module.exports = {
  getAllVendors,
  createVendor,
  updateVendor,
  deleteVendor
};
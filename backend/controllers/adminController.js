const db = require("../config/db");

// ===============================
// GET ALL USERS
// ===============================

const getAllUsers = async (req, res, next) => {
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


// ===============================
// GET ALL BOOKINGS
// ===============================

const getAllBookings = async (req, res, next) => {
  try {
    const [rows] = await db.query(`
      SELECT
        b.*,
        u.full_name,
        u.email,
        tp.package_name
      FROM bookings b
      LEFT JOIN users u
        ON b.user_id = u.user_id
      LEFT JOIN travel_packages tp
        ON b.package_id = tp.package_id
      ORDER BY b.booking_id DESC
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


// ===============================
// UPDATE USER ROLE
// ===============================

const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({
        success: false,
        message: "Role is required"
      });
    }

    const allowedRoles = [
      "customer",
      "admin",
      "vendor"
    ];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role"
      });
    }

    const [result] = await db.query(
      `
      UPDATE users
      SET role = ?
      WHERE user_id = ?
      `,
      [role, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      message: "User role updated successfully"
    });
  } catch (error) {
    next(error);
  }
};


// ===============================
// DELETE USER
// ===============================

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      `
      DELETE FROM users
      WHERE user_id = ?
      `,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};


// ===============================
// DASHBOARD STATISTICS
// ===============================

const getDashboardStats = async (req, res, next) => {
  try {
    const [[users]] = await db.query(`
      SELECT COUNT(*) AS total_users
      FROM users
    `);

    const [[packages]] = await db.query(`
      SELECT COUNT(*) AS total_packages
      FROM travel_packages
    `);

    const [[bookings]] = await db.query(`
      SELECT COUNT(*) AS total_bookings
      FROM bookings
    `);

    const [[revenue]] = await db.query(`
      SELECT
        COALESCE(SUM(total_amount), 0) AS total_revenue
      FROM bookings
      WHERE booking_status = 'Confirmed'
    `);

    res.json({
      success: true,
      data: {
        total_users: users.total_users,
        total_packages: packages.total_packages,
        total_bookings: bookings.total_bookings,
        total_revenue: revenue.total_revenue
      }
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getAllUsers,
  getAllBookings,
  updateUserRole,
  deleteUser,
  getDashboardStats
};
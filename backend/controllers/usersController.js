const db = require("../config/db");

// GET MY PROFILE
const getMyProfile = async (req, res, next) => {
  try {
    const userId = req.user.user_id;

    const [rows] = await db.query(
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
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    next(error);
  }
};


// UPDATE MY PROFILE
const updateMyProfile = async (req, res, next) => {
  try {
    const userId = req.user.user_id;

    const {
      full_name,
      phone
    } = req.body;

    if (!full_name && !phone) {
      return res.status(400).json({
        success: false,
        message: "Provide full_name or phone to update"
      });
    }

    await db.query(
      `
      UPDATE users
      SET
        full_name = COALESCE(?, full_name),
        phone = COALESCE(?, phone)
      WHERE user_id = ?
      `,
      [
        full_name || null,
        phone || null,
        userId
      ]
    );

    const [rows] = await db.query(
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
      [userId]
    );

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: rows[0]
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getMyProfile,
  updateMyProfile
};
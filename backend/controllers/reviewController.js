const db = require("../config/db");

// CREATE REVIEW
const createReview = async (req, res, next) => {
  try {
    const userId = req.user.user_id;

    const {
      package_id,
      rating,
      review_text
    } = req.body;

    if (!package_id || !rating) {
      return res.status(400).json({
        success: false,
        message: "package_id and rating are required"
      });
    }

    if (Number(rating) < 1 || Number(rating) > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5"
      });
    }

    const [packages] = await db.query(
      `
      SELECT package_id
      FROM travel_packages
      WHERE package_id = ?
      `,
      [package_id]
    );

    if (packages.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Travel package not found"
      });
    }

    const [result] = await db.query(
      `
      INSERT INTO reviews
      (
        user_id,
        package_id,
        rating,
        review_text,
        review_date
      )
      VALUES (?, ?, ?, ?, NOW())
      `,
      [
        userId,
        package_id,
        rating,
        review_text || null
      ]
    );

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review_id: result.insertId
    });
  } catch (error) {
    next(error);
  }
};

// GET PACKAGE REVIEWS
const getPackageReviews = async (req, res, next) => {
  try {
    const { packageId } = req.params;

    const [rows] = await db.query(
      `
      SELECT
        r.review_id,
        r.rating,
        r.review_text,
        r.review_date,
        u.full_name
      FROM reviews r
      INNER JOIN users u
        ON r.user_id = u.user_id
      WHERE r.package_id = ?
      ORDER BY r.review_id DESC
      `,
      [packageId]
    );

    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    next(error);
  }
};

// GET MY REVIEWS
const getMyReviews = async (req, res, next) => {
  try {
    const userId = req.user.user_id;

    const [rows] = await db.query(
      `
      SELECT
        r.review_id,
        r.rating,
        r.review_text,
        r.review_date,
        tp.package_name
      FROM reviews r
      INNER JOIN travel_packages tp
        ON r.package_id = tp.package_id
      WHERE r.user_id = ?
      ORDER BY r.review_id DESC
      `,
      [userId]
    );

    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    next(error);
  }
};

// DELETE REVIEW
const deleteReview = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const { id } = req.params;

    const [result] = await db.query(
      `
      DELETE FROM reviews
      WHERE review_id = ?
      AND user_id = ?
      `,
      [id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Review not found"
      });
    }

    res.json({
      success: true,
      message: "Review deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReview,
  getPackageReviews,
  getMyReviews,
  deleteReview
};
const db = require("../config/db");

// GET all restaurants
const getAllRestaurants = async (req, res, next) => {
  try {
    const [rows] = await db.query(`
      SELECT *
      FROM restaurants
      ORDER BY restaurant_id DESC
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

// GET restaurant by ID
const getRestaurantById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      `SELECT * FROM restaurants WHERE restaurant_id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found"
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

// SEARCH restaurants
const searchRestaurants = async (req, res, next) => {
  try {
    const {
      location,
      cuisine,
      min_price,
      max_price
    } = req.query;

    let sql = `SELECT * FROM restaurants WHERE 1=1`;
    const values = [];

    if (location) {
      sql += ` AND location LIKE ?`;
      values.push(`%${location}%`);
    }

    if (cuisine) {
      sql += ` AND cuisine LIKE ?`;
      values.push(`%${cuisine}%`);
    }

    if (min_price) {
      sql += ` AND price >= ?`;
      values.push(Number(min_price));
    }

    if (max_price) {
      sql += ` AND price <= ?`;
      values.push(Number(max_price));
    }

    sql += ` ORDER BY price ASC`;

    const [rows] = await db.query(sql, values);

    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    next(error);
  }
};

// CREATE restaurant
const createRestaurant = async (req, res, next) => {
  try {
    const {
      restaurant_name,
      location,
      cuisine,
      price,
      rating,
      description
    } = req.body;

    if (!restaurant_name || !location || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "restaurant_name, location and price are required"
      });
    }

    const [result] = await db.query(
      `
      INSERT INTO restaurants
      (
        restaurant_name,
        location,
        cuisine,
        price,
        rating,
        description
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        restaurant_name,
        location,
        cuisine || null,
        price,
        rating || 0,
        description || null
      ]
    );

    res.status(201).json({
      success: true,
      message: "Restaurant created successfully",
      restaurant_id: result.insertId
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE restaurant
const updateRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      restaurant_name,
      location,
      cuisine,
      price,
      rating,
      description
    } = req.body;

    const [result] = await db.query(
      `
      UPDATE restaurants
      SET
        restaurant_name = COALESCE(?, restaurant_name),
        location = COALESCE(?, location),
        cuisine = COALESCE(?, cuisine),
        price = COALESCE(?, price),
        rating = COALESCE(?, rating),
        description = COALESCE(?, description)
      WHERE restaurant_id = ?
      `,
      [
        restaurant_name,
        location,
        cuisine,
        price,
        rating,
        description,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found"
      });
    }

    res.json({
      success: true,
      message: "Restaurant updated successfully"
    });
  } catch (error) {
    next(error);
  }
};

// DELETE restaurant
const deleteRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      `DELETE FROM restaurants WHERE restaurant_id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found"
      });
    }

    res.json({
      success: true,
      message: "Restaurant deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  searchRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
};
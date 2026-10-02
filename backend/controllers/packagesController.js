const db = require("../config/db");

// GET all packages
const getAllPackages = async (req, res, next) => {
  try {
    const [rows] = await db.query(`
      SELECT *
      FROM travel_packages
      ORDER BY package_id DESC
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

// GET package by ID
const getPackageById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [packages] = await db.query(
      `SELECT * FROM travel_packages WHERE package_id = ?`,
      [id]
    );

    if (packages.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Travel package not found"
      });
    }

    let destinations = [];

    try {
      const [destinationRows] = await db.query(
        `
        SELECT d.*
        FROM destinations d
        INNER JOIN package_destinations pd
          ON d.destination_id = pd.destination_id
        WHERE pd.package_id = ?
        `,
        [id]
      );

      destinations = destinationRows;
    } catch (error) {
      console.log("Destination relation unavailable:", error.message);
    }

    res.json({
      success: true,
      data: {
        ...packages[0],
        destinations
      }
    });
  } catch (error) {
    next(error);
  }
};

// SEARCH packages
const searchPackages = async (req, res, next) => {
  try {
    const {
      search,
      min_price,
      max_price
    } = req.query;

    let sql = `SELECT * FROM travel_packages WHERE 1=1`;
    const values = [];

    if (search) {
      sql += `
        AND (
          package_name LIKE ?
          OR description LIKE ?
        )
      `;

      values.push(`%${search}%`);
      values.push(`%${search}%`);
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

// CREATE package
const createPackage = async (req, res, next) => {
  try {
    const {
      package_name,
      description,
      price,
      duration_days,
      max_people
    } = req.body;

    if (!package_name || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "package_name and price are required"
      });
    }

    const [result] = await db.query(
      `
      INSERT INTO travel_packages
      (
        package_name,
        description,
        price,
        duration_days,
        max_people
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        package_name,
        description || null,
        price,
        duration_days || 1,
        max_people || 10
      ]
    );

    res.status(201).json({
      success: true,
      message: "Travel package created successfully",
      package_id: result.insertId
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE package
const updatePackage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      package_name,
      description,
      price,
      duration_days,
      max_people
    } = req.body;

    const [result] = await db.query(
      `
      UPDATE travel_packages
      SET
        package_name = COALESCE(?, package_name),
        description = COALESCE(?, description),
        price = COALESCE(?, price),
        duration_days = COALESCE(?, duration_days),
        max_people = COALESCE(?, max_people)
      WHERE package_id = ?
      `,
      [
        package_name,
        description,
        price,
        duration_days,
        max_people,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Travel package not found"
      });
    }

    res.json({
      success: true,
      message: "Travel package updated successfully"
    });
  } catch (error) {
    next(error);
  }
};

// DELETE package
const deletePackage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      `DELETE FROM travel_packages WHERE package_id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Travel package not found"
      });
    }

    res.json({
      success: true,
      message: "Travel package deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPackages,
  getPackageById,
  searchPackages,
  createPackage,
  updatePackage,
  deletePackage
};
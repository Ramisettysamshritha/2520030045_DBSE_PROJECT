const db = require("../config/db");

// GET all buses
const getAllBuses = async (req, res, next) => {
  try {
    const [rows] = await db.query(`
      SELECT *
      FROM buses
      ORDER BY bus_id DESC
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

// GET bus by ID
const getBusById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      `SELECT * FROM buses WHERE bus_id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Bus not found"
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

// SEARCH buses
const searchBuses = async (req, res, next) => {
  try {
    const {
      from,
      to,
      bus_type,
      min_price,
      max_price
    } = req.query;

    let sql = `SELECT * FROM buses WHERE 1=1`;
    const values = [];

    if (from) {
      sql += ` AND from_location LIKE ?`;
      values.push(`%${from}%`);
    }

    if (to) {
      sql += ` AND to_location LIKE ?`;
      values.push(`%${to}%`);
    }

    if (bus_type) {
      sql += ` AND bus_type = ?`;
      values.push(bus_type);
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

// CREATE bus
const createBus = async (req, res, next) => {
  try {
    const {
      bus_name,
      bus_type,
      from_location,
      to_location,
      departure_time,
      arrival_time,
      price,
      total_seats
    } = req.body;

    if (
      !bus_name ||
      !from_location ||
      !to_location ||
      price === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "bus_name, from_location, to_location and price are required"
      });
    }

    const [result] = await db.query(
      `
      INSERT INTO buses
      (
        bus_name,
        bus_type,
        from_location,
        to_location,
        departure_time,
        arrival_time,
        price,
        total_seats
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        bus_name,
        bus_type || "Comfort",
        from_location,
        to_location,
        departure_time || null,
        arrival_time || null,
        price,
        total_seats || 40
      ]
    );

    res.status(201).json({
      success: true,
      message: "Bus created successfully",
      bus_id: result.insertId
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE bus
const updateBus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      bus_name,
      bus_type,
      from_location,
      to_location,
      departure_time,
      arrival_time,
      price,
      total_seats
    } = req.body;

    const [result] = await db.query(
      `
      UPDATE buses
      SET
        bus_name = COALESCE(?, bus_name),
        bus_type = COALESCE(?, bus_type),
        from_location = COALESCE(?, from_location),
        to_location = COALESCE(?, to_location),
        departure_time = COALESCE(?, departure_time),
        arrival_time = COALESCE(?, arrival_time),
        price = COALESCE(?, price),
        total_seats = COALESCE(?, total_seats)
      WHERE bus_id = ?
      `,
      [
        bus_name,
        bus_type,
        from_location,
        to_location,
        departure_time,
        arrival_time,
        price,
        total_seats,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Bus not found"
      });
    }

    res.json({
      success: true,
      message: "Bus updated successfully"
    });
  } catch (error) {
    next(error);
  }
};

// DELETE bus
const deleteBus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      `DELETE FROM buses WHERE bus_id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Bus not found"
      });
    }

    res.json({
      success: true,
      message: "Bus deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBuses,
  getBusById,
  searchBuses,
  createBus,
  updateBus,
  deleteBus
};
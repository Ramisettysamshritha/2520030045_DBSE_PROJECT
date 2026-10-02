const db = require("../config/db");

// =====================================================
// GET TABLE COLUMNS
// =====================================================
const getDestinationColumns = async () => {
  const [columns] = await db.query(`
    SELECT
      COLUMN_NAME,
      DATA_TYPE,
      EXTRA
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'destinations'
    ORDER BY ORDINAL_POSITION
  `);

  return columns;
};


// =====================================================
// GET ALL DESTINATIONS
// GET /api/destinations
// =====================================================
const getAllDestinations = async (req, res, next) => {
  try {
    const [destinations] = await db.query(`
      SELECT *
      FROM destinations
      ORDER BY destination_id DESC
    `);

    res.status(200).json({
      success: true,
      count: destinations.length,
      data: destinations
    });

  } catch (error) {
    next(error);
  }
};


// =====================================================
// GET DESTINATION BY ID
// GET /api/destinations/:id
// =====================================================
const getDestinationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [destinations] = await db.query(
      `
      SELECT *
      FROM destinations
      WHERE destination_id = ?
      `,
      [id]
    );

    if (destinations.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Destination not found"
      });
    }

    res.status(200).json({
      success: true,
      data: destinations[0]
    });

  } catch (error) {
    next(error);
  }
};


// =====================================================
// SEARCH DESTINATIONS
// GET /api/destinations/search?search=goa
// =====================================================
const searchDestinations = async (req, res, next) => {
  try {
    const { search } = req.query;

    if (!search) {
      const [destinations] = await db.query(`
        SELECT *
        FROM destinations
        ORDER BY destination_id DESC
      `);

      return res.status(200).json({
        success: true,
        count: destinations.length,
        data: destinations
      });
    }

    const columns = await getDestinationColumns();

    // Find text columns
    const textColumns = columns
      .filter(column =>
        ["varchar", "char", "text", "tinytext", "mediumtext", "longtext"]
          .includes(column.DATA_TYPE.toLowerCase())
      )
      .map(column => column.COLUMN_NAME);

    if (textColumns.length === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        data: []
      });
    }

    const conditions = textColumns
      .map(column => `\`${column}\` LIKE ?`)
      .join(" OR ");

    const values = textColumns.map(
      () => `%${search}%`
    );

    const [destinations] = await db.query(
      `
      SELECT *
      FROM destinations
      WHERE ${conditions}
      ORDER BY destination_id DESC
      `,
      values
    );

    res.status(200).json({
      success: true,
      count: destinations.length,
      data: destinations
    });

  } catch (error) {
    next(error);
  }
};


// =====================================================
// CREATE DESTINATION
// POST /api/destinations
// =====================================================
const createDestination = async (req, res, next) => {
  try {
    const body = req.body;

    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Destination data is required"
      });
    }

    const columns = await getDestinationColumns();

    // Remove auto increment columns
    const allowedColumns = columns
      .filter(column =>
        !column.EXTRA.toLowerCase().includes("auto_increment")
      )
      .map(column => column.COLUMN_NAME);

    const fields = Object.keys(body)
      .filter(field => allowedColumns.includes(field));

    if (fields.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid destination fields provided"
      });
    }

    const values = fields.map(
      field => body[field]
    );

    const placeholders = fields
      .map(() => "?")
      .join(", ");

    const fieldNames = fields
      .map(field => `\`${field}\``)
      .join(", ");

    const [result] = await db.query(
      `
      INSERT INTO destinations
      (${fieldNames})
      VALUES (${placeholders})
      `,
      values
    );

    const [destination] = await db.query(
      `
      SELECT *
      FROM destinations
      WHERE destination_id = ?
      `,
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: "Destination created successfully",
      data: destination[0]
    });

  } catch (error) {
    next(error);
  }
};


// =====================================================
// UPDATE DESTINATION
// PUT /api/destinations/:id
// =====================================================
const updateDestination = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;

    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Destination data is required"
      });
    }

    const columns = await getDestinationColumns();

    const allowedColumns = columns
      .map(column => column.COLUMN_NAME)
      .filter(column =>
        column !== "destination_id"
      );

    const fields = Object.keys(body)
      .filter(field => allowedColumns.includes(field));

    if (fields.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid destination fields provided"
      });
    }

    const [existing] = await db.query(
      `
      SELECT destination_id
      FROM destinations
      WHERE destination_id = ?
      `,
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Destination not found"
      });
    }

    const setClause = fields
      .map(field => `\`${field}\` = ?`)
      .join(", ");

    const values = fields.map(
      field => body[field]
    );

    values.push(id);

    await db.query(
      `
      UPDATE destinations
      SET ${setClause}
      WHERE destination_id = ?
      `,
      values
    );

    const [updatedDestination] = await db.query(
      `
      SELECT *
      FROM destinations
      WHERE destination_id = ?
      `,
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Destination updated successfully",
      data: updatedDestination[0]
    });

  } catch (error) {
    next(error);
  }
};


// =====================================================
// DELETE DESTINATION
// DELETE /api/destinations/:id
// =====================================================
const deleteDestination = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [existing] = await db.query(
      `
      SELECT destination_id
      FROM destinations
      WHERE destination_id = ?
      `,
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Destination not found"
      });
    }

    await db.query(
      `
      DELETE FROM destinations
      WHERE destination_id = ?
      `,
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Destination deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};


// =====================================================
// EXPORT
// =====================================================
module.exports = {
  getAllDestinations,
  getDestinationById,
  searchDestinations,
  createDestination,
  updateDestination,
  deleteDestination
};
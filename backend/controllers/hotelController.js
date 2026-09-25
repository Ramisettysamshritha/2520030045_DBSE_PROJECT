const db = require("../config/db");

// =====================================================
// GET ALL HOTELS
// GET /api/hotels
// =====================================================
const getAllHotels = async (req, res, next) => {
  try {
    const [hotels] = await db.query(`
      SELECT *
      FROM hotels
      ORDER BY hotel_id DESC
    `);

    res.status(200).json({
      success: true,
      count: hotels.length,
      data: hotels
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// GET HOTEL BY ID
// GET /api/hotels/:id
// =====================================================
const getHotelById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [hotels] = await db.query(
      `
      SELECT *
      FROM hotels
      WHERE hotel_id = ?
      `,
      [id]
    );

    if (hotels.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found"
      });
    }

    res.status(200).json({
      success: true,
      data: hotels[0]
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// SEARCH HOTELS
// GET /api/hotels/search
// =====================================================
const searchHotels = async (req, res, next) => {
  try {
    const {
      search,
      location,
      min_price,
      max_price,
      sort
    } = req.query;

    let sql = `
      SELECT *
      FROM hotels
      WHERE 1 = 1
    `;

    const values = [];

    // Search hotel name
    if (search) {
      sql += `
        AND hotel_name LIKE ?
      `;

      values.push(`%${search}%`);
    }

    // Search location
    if (location) {
      sql += `
        AND location LIKE ?
      `;

      values.push(`%${location}%`);
    }

    // Minimum price
    if (min_price) {
      sql += `
        AND price_per_night >= ?
      `;

      values.push(Number(min_price));
    }

    // Maximum price
    if (max_price) {
      sql += `
        AND price_per_night <= ?
      `;

      values.push(Number(max_price));
    }

    // Sorting
    if (sort === "price_asc") {
      sql += ` ORDER BY price_per_night ASC`;
    } else if (sort === "price_desc") {
      sql += ` ORDER BY price_per_night DESC`;
    } else if (sort === "rating_desc") {
      sql += ` ORDER BY rating DESC`;
    } else {
      sql += ` ORDER BY hotel_id DESC`;
    }

    const [hotels] = await db.query(
      sql,
      values
    );

    res.status(200).json({
      success: true,
      count: hotels.length,
      data: hotels
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// GET ROOMS OF HOTEL
// GET /api/hotels/:id/rooms
// =====================================================
const getHotelRooms = async (req, res, next) => {
  try {
    const { id } = req.params;

    // First check hotel
    const [hotel] = await db.query(
      `
      SELECT *
      FROM hotels
      WHERE hotel_id = ?
      `,
      [id]
    );

    if (hotel.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found"
      });
    }

    // Get rooms
    const [rooms] = await db.query(
      `
      SELECT *
      FROM rooms
      WHERE hotel_id = ?
      ORDER BY room_id DESC
      `,
      [id]
    );

    res.status(200).json({
      success: true,
      hotel: hotel[0],
      count: rooms.length,
      rooms
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// GET ROOM BY ID
// GET /api/hotels/rooms/:roomId
// =====================================================
const getRoomById = async (req, res, next) => {
  try {
    const { roomId } = req.params;

    const [rooms] = await db.query(
      `
      SELECT
        r.*,
        h.hotel_name,
        h.location
      FROM rooms r
      LEFT JOIN hotels h
        ON r.hotel_id = h.hotel_id
      WHERE r.room_id = ?
      `,
      [roomId]
    );

    if (rooms.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Room not found"
      });
    }

    res.status(200).json({
      success: true,
      data: rooms[0]
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// CREATE HOTEL
// POST /api/hotels
// =====================================================
const createHotel = async (req, res, next) => {
  try {
    const {
      hotel_name,
      location,
      description,
      price_per_night,
      rating
    } = req.body;

    if (!hotel_name) {
      return res.status(400).json({
        success: false,
        message: "Hotel name is required"
      });
    }

    if (!location) {
      return res.status(400).json({
        success: false,
        message: "Hotel location is required"
      });
    }

    if (
      price_per_night === undefined ||
      price_per_night === null
    ) {
      return res.status(400).json({
        success: false,
        message: "Hotel price is required"
      });
    }

    const [result] = await db.query(
      `
      INSERT INTO hotels
      (
        hotel_name,
        location,
        description,
        price_per_night,
        rating
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        hotel_name,
        location,
        description || null,
        price_per_night,
        rating || null
      ]
    );

    const [hotel] = await db.query(
      `
      SELECT *
      FROM hotels
      WHERE hotel_id = ?
      `,
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: "Hotel created successfully",
      data: hotel[0]
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// UPDATE HOTEL
// PUT /api/hotels/:id
// =====================================================
const updateHotel = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      hotel_name,
      location,
      description,
      price_per_night,
      rating
    } = req.body;

    const [existing] = await db.query(
      `
      SELECT hotel_id
      FROM hotels
      WHERE hotel_id = ?
      `,
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found"
      });
    }

    await db.query(
      `
      UPDATE hotels
      SET
        hotel_name = ?,
        location = ?,
        description = ?,
        price_per_night = ?,
        rating = ?
      WHERE hotel_id = ?
      `,
      [
        hotel_name,
        location,
        description || null,
        price_per_night,
        rating || null,
        id
      ]
    );

    const [hotel] = await db.query(
      `
      SELECT *
      FROM hotels
      WHERE hotel_id = ?
      `,
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Hotel updated successfully",
      data: hotel[0]
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// DELETE HOTEL
// DELETE /api/hotels/:id
// =====================================================
const deleteHotel = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      `
      DELETE FROM hotels
      WHERE hotel_id = ?
      `,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Hotel deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getAllHotels,
  getHotelById,
  searchHotels,
  getHotelRooms,
  getRoomById,
  createHotel,
  updateHotel,
  deleteHotel
};
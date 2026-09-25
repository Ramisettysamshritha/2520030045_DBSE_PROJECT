const db = require("../config/db");

// CREATE PACKAGE BOOKING
const createBooking = async (req, res, next) => {
  const connection = await db.getConnection();

  try {
    const userId = req.user.user_id;

    const {
      package_id,
      travel_date,
      no_of_people
    } = req.body;

    if (!package_id || !travel_date || !no_of_people) {
      return res.status(400).json({
        success: false,
        message: "package_id, travel_date and no_of_people are required"
      });
    }

    const people = Number(no_of_people);

    if (people <= 0) {
      return res.status(400).json({
        success: false,
        message: "Number of people must be greater than zero"
      });
    }

    await connection.beginTransaction();

    const [packages] = await connection.query(
      `
      SELECT *
      FROM travel_packages
      WHERE package_id = ?
      `,
      [package_id]
    );

    if (packages.length === 0) {
      await connection.rollback();

      return res.status(404).json({
        success: false,
        message: "Travel package not found"
      });
    }

    const packageData = packages[0];

    if (
      packageData.max_people &&
      people > packageData.max_people
    ) {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message: `Maximum allowed people for this package is ${packageData.max_people}`
      });
    }

    const price = Number(packageData.price);
    const totalAmount = price * people;

    const [result] = await connection.query(
      `
      INSERT INTO bookings
      (
        user_id,
        package_id,
        booking_date,
        travel_date,
        no_of_people,
        total_amount,
        booking_status
      )
      VALUES (?, ?, NOW(), ?, ?, ?, ?)
      `,
      [
        userId,
        package_id,
        travel_date,
        people,
        totalAmount,
        "Pending"
      ]
    );

    await connection.commit();

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: {
        booking_id: result.insertId,
        package_id,
        travel_date,
        no_of_people: people,
        price_per_person: price,
        total_amount: totalAmount,
        booking_status: "Pending"
      }
    });
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
};

// GET MY BOOKINGS
const getMyBookings = async (req, res, next) => {
  try {
    const userId = req.user.user_id;

    const [rows] = await db.query(
      `
      SELECT
        b.*,
        tp.package_name,
        tp.description,
        tp.price,
        tp.duration_days
      FROM bookings b
      LEFT JOIN travel_packages tp
        ON b.package_id = tp.package_id
      WHERE b.user_id = ?
      ORDER BY b.booking_id DESC
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

// GET BOOKING BY ID
const getBookingById = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const { id } = req.params;

    const [rows] = await db.query(
      `
      SELECT
        b.*,
        tp.package_name,
        tp.description,
        tp.price,
        tp.duration_days
      FROM bookings b
      LEFT JOIN travel_packages tp
        ON b.package_id = tp.package_id
      WHERE b.booking_id = ?
      AND b.user_id = ?
      `,
      [id, userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
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

// CANCEL BOOKING
const cancelBooking = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const { id } = req.params;

    const [result] = await db.query(
      `
      UPDATE bookings
      SET booking_status = 'Cancelled'
      WHERE booking_id = ?
      AND user_id = ?
      AND booking_status NOT IN ('Cancelled', 'Completed')
      `,
      [id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking cannot be cancelled or was not found"
      });
    }

    res.json({
      success: true,
      message: "Booking cancelled successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking
};
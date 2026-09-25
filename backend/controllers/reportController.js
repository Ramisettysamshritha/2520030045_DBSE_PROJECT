const db = require("../config/db");

// ===============================
// SALES SUMMARY
// ===============================

const getSalesSummary = async (req, res, next) => {
  try {
    const [[summary]] = await db.query(`
      SELECT
        COUNT(*) AS total_bookings,
        COALESCE(SUM(total_amount), 0) AS total_sales,
        COALESCE(AVG(total_amount), 0) AS average_booking_value
      FROM bookings
      WHERE booking_status = 'Confirmed'
    `);

    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    next(error);
  }
};


// ===============================
// SALES BY PACKAGE
// ===============================

const getSalesByPackage = async (req, res, next) => {
  try {
    const [rows] = await db.query(`
      SELECT
        tp.package_id,
        tp.package_name,
        COUNT(b.booking_id) AS total_bookings,
        COALESCE(SUM(b.total_amount), 0) AS total_sales
      FROM travel_packages tp
      LEFT JOIN bookings b
        ON tp.package_id = b.package_id
        AND b.booking_status = 'Confirmed'
      GROUP BY
        tp.package_id,
        tp.package_name
      ORDER BY total_sales DESC
    `);

    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    next(error);
  }
};


// ===============================
// SALES BY MONTH
// ===============================

const getMonthlySales = async (req, res, next) => {
  try {
    const [rows] = await db.query(`
      SELECT
        DATE_FORMAT(booking_date, '%Y-%m') AS month,
        COUNT(*) AS total_bookings,
        COALESCE(SUM(total_amount), 0) AS total_sales
      FROM bookings
      WHERE booking_status = 'Confirmed'
      GROUP BY DATE_FORMAT(booking_date, '%Y-%m')
      ORDER BY month ASC
    `);

    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    next(error);
  }
};


// ===============================
// BOOKING STATUS REPORT
// ===============================

const getBookingStatusReport = async (req, res, next) => {
  try {
    const [rows] = await db.query(`
      SELECT
        booking_status,
        COUNT(*) AS total
      FROM bookings
      GROUP BY booking_status
      ORDER BY total DESC
    `);

    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getSalesSummary,
  getSalesByPackage,
  getMonthlySales,
  getBookingStatusReport
};
const db = require("../config/db");

// CREATE PAYMENT
const createPayment = async (req, res, next) => {
  try {
    const userId = req.user.user_id;

    const {
      booking_id,
      payment_method
    } = req.body;

    if (!booking_id || !payment_method) {
      return res.status(400).json({
        success: false,
        message: "booking_id and payment_method are required"
      });
    }

    const [bookings] = await db.query(
      `
      SELECT *
      FROM bookings
      WHERE booking_id = ?
      AND user_id = ?
      `,
      [booking_id, userId]
    );

    if (bookings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    const booking = bookings[0];

    const transactionId =
      "TXN" +
      Date.now() +
      Math.floor(Math.random() * 1000);

    const [result] = await db.query(
      `
      INSERT INTO payments
      (
        booking_id,
        amount,
        payment_method,
        payment_status,
        transaction_id,
        payment_date
      )
      VALUES (?, ?, ?, ?, ?, NOW())
      `,
      [
        booking_id,
        booking.total_amount,
        payment_method,
        "Pending",
        transactionId
      ]
    );

    res.status(201).json({
      success: true,
      message: "Payment initiated successfully",
      data: {
        payment_id: result.insertId,
        booking_id,
        amount: booking.total_amount,
        payment_method,
        payment_status: "Pending",
        transaction_id: transactionId
      }
    });
  } catch (error) {
    next(error);
  }
};

// COMPLETE TEST PAYMENT
const completePayment = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const { paymentId } = req.params;

    const [payments] = await db.query(
      `
      SELECT
        p.*,
        b.user_id,
        b.booking_id
      FROM payments p
      INNER JOIN bookings b
        ON p.booking_id = b.booking_id
      WHERE p.payment_id = ?
      AND b.user_id = ?
      `,
      [paymentId, userId]
    );

    if (payments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Payment not found"
      });
    }

    const payment = payments[0];

    await db.query(
      `
      UPDATE payments
      SET payment_status = 'Completed'
      WHERE payment_id = ?
      `,
      [paymentId]
    );

    await db.query(
      `
      UPDATE bookings
      SET booking_status = 'Confirmed'
      WHERE booking_id = ?
      `,
      [payment.booking_id]
    );

    res.json({
      success: true,
      message: "Payment completed successfully",
      data: {
        payment_id: paymentId,
        booking_id: payment.booking_id,
        payment_status: "Completed",
        booking_status: "Confirmed"
      }
    });
  } catch (error) {
    next(error);
  }
};

// GET MY PAYMENTS
const getMyPayments = async (req, res, next) => {
  try {
    const userId = req.user.user_id;

    const [rows] = await db.query(
      `
      SELECT
        p.*,
        b.package_id,
        b.travel_date,
        b.booking_status
      FROM payments p
      INNER JOIN bookings b
        ON p.booking_id = b.booking_id
      WHERE b.user_id = ?
      ORDER BY p.payment_id DESC
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

module.exports = {
  createPayment,
  completePayment,
  getMyPayments
};
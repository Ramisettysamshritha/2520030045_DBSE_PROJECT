const db = require("../config/db");

// ======================================================
// CREATE PAYMENT
// ======================================================
const createPayment = async (req, res, next) => {
  try {
    const userId = req.user.user_id;

    const {
      booking_id,
      payment_method,
      upi_option,
      upi_id,
      card_type,
      card_holder_name,
      card_last_four
    } = req.body;

    // ---------------- VALIDATION ----------------

    if (!booking_id || !payment_method) {
      return res.status(400).json({
        success: false,
        message: "booking_id and payment_method are required"
      });
    }

    const allowedMethods = [
      "UPI",
      "Card",
      "Net Banking",
      "Wallet",
      "Cash"
    ];

    if (!allowedMethods.includes(payment_method)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method"
      });
    }

    // ---------------- UPI VALIDATION ----------------

    if (payment_method === "UPI") {

      if (!upi_option) {
        return res.status(400).json({
          success: false,
          message: "Please select Generate QR or Enter UPI ID"
        });
      }

      if (
        upi_option === "upi_id" &&
        !upi_id
      ) {
        return res.status(400).json({
          success: false,
          message: "UPI ID is required"
        });
      }
    }

    // ---------------- CARD VALIDATION ----------------

    if (payment_method === "Card") {

      if (!card_type) {
        return res.status(400).json({
          success: false,
          message: "Please select Debit Card or Credit Card"
        });
      }

      if (!card_holder_name) {
        return res.status(400).json({
          success: false,
          message: "Card holder name is required"
        });
      }

      if (!card_last_four) {
        return res.status(400).json({
          success: false,
          message: "Card information is required"
        });
      }
    }

    // ---------------- CHECK BOOKING ----------------

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

    // ---------------- TRANSACTION ID ----------------

    const transactionId =
      "TXN" +
      Date.now() +
      Math.floor(Math.random() * 1000);

    // ---------------- INSERT PAYMENT ----------------

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

    // ---------------- RESPONSE ----------------

    const responseData = {
      payment_id: result.insertId,
      booking_id,
      amount: booking.total_amount,
      payment_method,
      payment_status: "Pending",
      transaction_id: transactionId
    };

    // UPI information
    if (payment_method === "UPI") {

      responseData.upi_option = upi_option;

      if (upi_option === "upi_id") {
        responseData.upi_id = upi_id;
      }

      if (upi_option === "generate_qr") {
        responseData.qr_message =
          "QR generation requested. Use the transaction reference to complete the payment.";
      }
    }

    // Card information
    if (payment_method === "Card") {

      responseData.card_type = card_type;
      responseData.card_holder_name = card_holder_name;
      responseData.card_last_four = card_last_four;
    }

    res.status(201).json({
      success: true,
      message: "Payment initiated successfully",
      data: responseData
    });

  } catch (error) {
    next(error);
  }
};


// ======================================================
// COMPLETE PAYMENT
// ======================================================
const completePayment = async (req, res, next) => {
  try {

    const userId = req.user.user_id;
    const { paymentId } = req.params;

    // ---------------- FIND PAYMENT ----------------

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

    // ---------------- UPDATE PAYMENT ----------------

    await db.query(
      `
      UPDATE payments
      SET payment_status = 'Successful'
      WHERE payment_id = ?
      `,
      [paymentId]
    );

    // ---------------- UPDATE BOOKING ----------------

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
        payment_status: "Successful",
        booking_status: "Confirmed"
      }
    });

  } catch (error) {
    next(error);
  }
};


// ======================================================
// GET MY PAYMENTS
// ======================================================
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
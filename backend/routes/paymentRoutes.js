const express = require("express");

const {
  createPayment,
  completePayment,
  getMyPayments
} = require("../controllers/paymentsController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createPayment);

router.put("/:paymentId/complete", completePayment);

router.get("/my", getMyPayments);

module.exports = router;
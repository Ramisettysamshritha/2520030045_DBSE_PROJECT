const express = require("express");

const {
  createReview,
  getPackageReviews,
  getMyReviews,
  deleteReview
} = require("../controllers/reviewController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/package/:packageId", getPackageReviews);

router.use(authMiddleware);

router.post("/", createReview);

router.get("/my", getMyReviews);

router.delete("/:id", deleteReview);

module.exports = router;
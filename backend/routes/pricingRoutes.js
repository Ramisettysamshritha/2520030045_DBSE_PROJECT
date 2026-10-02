const express = require("express");

const {
  calculatePackagePrice,
  getPricePreview
} = require("../controllers/pricingController");

const router = express.Router();


// Calculate price for an actual package
router.get(
  "/package/:id",
  calculatePackagePrice
);


// Preview dynamic pricing
router.get(
  "/preview",
  getPricePreview
);


module.exports = router;
const express = require("express");

const {
  getAllDestinations,
  getDestinationById,
  searchDestinations,
  createDestination,
  updateDestination,
  deleteDestination
} = require("../controllers/destinationController");

const router = express.Router();


// =====================================================
// GET ALL DESTINATIONS
// GET /api/destinations
// =====================================================
router.get("/", getAllDestinations);


// =====================================================
// SEARCH DESTINATIONS
// GET /api/destinations/search?search=Goa
// =====================================================
router.get("/search", searchDestinations);


// =====================================================
// GET DESTINATION BY ID
// GET /api/destinations/:id
// =====================================================
router.get("/:id", getDestinationById);


// =====================================================
// CREATE DESTINATION
// POST /api/destinations
// =====================================================
router.post("/", createDestination);


// =====================================================
// UPDATE DESTINATION
// PUT /api/destinations/:id
// =====================================================
router.put("/:id", updateDestination);


// =====================================================
// DELETE DESTINATION
// DELETE /api/destinations/:id
// =====================================================
router.delete("/:id", deleteDestination);


module.exports = router;
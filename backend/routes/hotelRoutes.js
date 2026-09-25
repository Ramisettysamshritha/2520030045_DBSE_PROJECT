const express = require("express");

const {
  getAllHotels,
  getHotelById,
  searchHotels,
  getHotelRooms,
  getRoomById,
  createHotel,
  updateHotel,
  deleteHotel
} = require("../controllers/hotelController");

const router = express.Router();


// =====================================================
// GET ALL HOTELS
// GET /api/hotels
// =====================================================
router.get("/", getAllHotels);


// =====================================================
// SEARCH HOTELS
// GET /api/hotels/search
// =====================================================
router.get("/search", searchHotels);


// =====================================================
// GET ROOM BY ID
// GET /api/hotels/rooms/:roomId
// =====================================================
router.get("/rooms/:roomId", getRoomById);


// =====================================================
// GET ALL ROOMS FOR HOTEL
// GET /api/hotels/:id/rooms
// =====================================================
router.get("/:id/rooms", getHotelRooms);


// =====================================================
// GET HOTEL BY ID
// GET /api/hotels/:id
// =====================================================
router.get("/:id", getHotelById);


// =====================================================
// CREATE HOTEL
// POST /api/hotels
// =====================================================
router.post("/", createHotel);


// =====================================================
// UPDATE HOTEL
// PUT /api/hotels/:id
// =====================================================
router.put("/:id", updateHotel);


// =====================================================
// DELETE HOTEL
// DELETE /api/hotels/:id
// =====================================================
router.delete("/:id", deleteHotel);


module.exports = router;
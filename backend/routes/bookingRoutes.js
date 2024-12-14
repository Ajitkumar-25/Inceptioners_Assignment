const express = require("express");
const {
  createBooking,
  getBookings,
  getBookingById,
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/bookpackage", createBooking);
router.get("/getbookings", getBookings);
router.get("/:id", getBookingById);

module.exports = router;

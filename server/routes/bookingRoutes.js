const express = require("express")
const router = express.Router();
const { requireAuth } = require("../middleware/requireAuth");

const bookingController = require("../controllers/bookingController");

router.use(requireAuth);

router.post("/create-hotel-booking", bookingController.createBooking);

router.get("/get-user-booking", bookingController.getUserBooking);

router.get("/get-owner-booking/:hotel_id", bookingController.getOwnerBooking);

router.post(
    "/cancel-booking/:booking_id/:hotel_id",
    bookingController.cancelBooking,
);

module.exports = router;

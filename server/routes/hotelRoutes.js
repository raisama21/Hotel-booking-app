const express = require("express")
const router = express.Router()
const { requireAuth } = require("../middleware/requireAuth")

const hotelController = require("../controllers/hotelController")

router.use(requireAuth)

router.post("/create-new-hotel", hotelController.createHotel)

router.get("/get-all-hotel", hotelController.getAllHotel)

router.get("/get-one-hotel/:hotel_id", hotelController.getOneHotel)

router.get("/get-user-hotel", hotelController.getHotelByUserId)

router.put("/update-one-hotel/:hotel_id", hotelController.updateOneHotel)

router.delete("/delete-hotel/:hotel_id", hotelController.deleteOneHotel)

module.exports = router

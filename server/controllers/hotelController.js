const Hotel = require("../models/Hotel")
const User = require("../models/User")

async function createHotel(req, res) {

    const hotelData = req.body
    const user_id = req.user._id

    try {
        const hotel = await Hotel.createHotel(hotelData, user_id)

        const user = await User.findOne({ _id: user_id })
        user.hotel_id = hotel._id

        user.save()

        res.status(201).json(hotel)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

async function getAllHotel(req, res) {

    try {
        const hotel = await Hotel.getAllHotel()

        res.status(200).json(hotel)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

async function getOneHotel(req, res) {

    const { hotel_id } = req.params

    try {
        const hotel = await Hotel.getOneHotel(hotel_id)

        res.status(200).json(hotel)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

async function getHotelByUserId(req, res) {

    const user_id = req.user._id

    try {
        const hotel = await Hotel.getUserHotel(user_id)

        res.status(200).json(hotel)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

async function updateOneHotel(req, res) {

    const hotelData = req.body
    const { hotel_id } = req.params

    try {
        const hotel = await Hotel.updateOneHotel(hotelData, hotel_id)

        res.status(200).json(hotel)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

async function deleteOneHotel(req, res) {

    const { hotel_id } = req.params

    try {
        const hotel = await Hotel.deleteOneHotel(hotel_id)

        res.sendStatus(204)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

module.exports = {
    createHotel, getAllHotel, getOneHotel, getHotelByUserId, updateOneHotel, deleteOneHotel
}

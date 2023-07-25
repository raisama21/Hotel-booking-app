const Booking = require("../models/Booking")
const Hotel = require("../models/Hotel")

async function createBooking(req, res) {

    const bookingData = req.body
    const { _id, userName, email } = req.user

    try {
        const booking = await Booking.createBooking(bookingData, _id, userName, email)

        const hotel = await Hotel.findOne({ _id: req.body.hotel_id })

        hotel.currentBookings.push({
            booking_id: booking._id,
            checkInDate: booking.checkInDate,
            checkOutDate: booking.checkOutDate,
            user_id: booking.user_id,
            status: booking.status,
        })

        await hotel.save()

        res.status(201).json(booking)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

async function getUserBooking(req, res) {

    const user_id = req.user._id

    try {
        const booking = await Booking.getUserBooking(user_id)

        res.status(200).json(booking)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

async function getOwnerBooking(req, res) {

    const hotel_id = req.params.hotel_id

    try {
        const booking = await Booking.getOwnerBooking(hotel_id)

        res.status(200).json(booking)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

async function cancelBooking(req, res) {

    const { booking_id, hotel_id } = req.params

    try {
        const booking = await Booking.findOne({ _id: booking_id })
        booking.status = "cancelled"

        await booking.save()

        const hotel = await Hotel.findOne({ _id: hotel_id })
        const currentBookings = hotel.currentBookings
        const cancel = currentBookings.filter((currentBooking) => currentBooking.booking_id.toString() !== booking_id)
        hotel.currentBookings = cancel

        await hotel.save()

        res.status(200).json({ message: "Your booking was sucessfully cancelled" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

module.exports = {
    createBooking, getUserBooking, getOwnerBooking, cancelBooking
}

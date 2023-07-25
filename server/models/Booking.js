const { default: mongoose, Schema } = require("mongoose")

const bookingSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    hotel_id: {
        type: String,
        required: true
    },
    hotelName: {
        type: String,
        required: true,
    },
    checkInDate: {
        type: String,
        required: true,
    },
    checkOutDate: {
        type: String,
        required: true,
    },
    rentPerDay: {
        type: Number,
        required: true,
    },
    totalDays: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    transaction_id: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "booked"
    },
}, { timestamps: true })

/*
 * static method for creating booking
 * */
bookingSchema.statics.createBooking = async function(bookingData, _id, userName, email) {
    const {
        hotel_id,
        hotelName,
        checkInDate,
        checkOutDate,
        rentPerDay,
        totalDays,
        totalAmount,
        transaction_id
    } = bookingData

    const booking = await this.create({
        user_id: _id,
        userName,
        email,
        hotel_id,
        hotelName,
        checkInDate,
        checkOutDate,
        rentPerDay,
        totalDays,
        totalAmount,
        transaction_id
    })

    return booking
}

/*
 * static method for getting user booking
 * */
bookingSchema.statics.getUserBooking = async function(user_id) {
    const booking = await this.find({ user_id })

    return booking
}

/*
 * static method for getting owner booking
 * */
bookingSchema.statics.getOwnerBooking = async function(hotel_id) {
    const booking = await this.find({ hotel_id })

    return booking
}

module.exports = mongoose.model("Booking", bookingSchema)

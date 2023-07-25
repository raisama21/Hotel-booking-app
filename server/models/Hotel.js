const { default: mongoose, Schema } = require("mongoose")

const hotelSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    hotelName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    maxCount: {
        type: String,
        requred: true,
    },
    phoneNumber: {
        type: String,
        requred: true,
    },
    rentPerDay: {
        type: String,
        requred: true,
    },
    description: {
        type: String,
        requred: true,
    },
    currentBookings: [],
}, { timestamps: true })

/*
 * statics method for creating hotel
 * */
hotelSchema.statics.createHotel = async function(hotelData, user_id) {
    const { hotelName, city, street, maxCount, phoneNumber, rentPerDay, description, currentBookings } = hotelData

    if (!(hotelName || city || street || maxCount || phoneNumber || rentPerDay || description)) {
        throw Error("All feild must be filled")
    }

    const exist = await this.findOne({ hotelName })

    if (exist) {
        throw Error("Hotel name alreay in use")
    }

    const hotel = await this.create({
        user_id,
        hotelName,
        city,
        street,
        maxCount,
        phoneNumber,
        rentPerDay,
        description,
        currentBookings,
    })

    return hotel
}

/*
 * statics method for getiing all hotel
 * */
hotelSchema.statics.getAllHotel = async function() {
    const hotel = await this.find()

    return hotel
}

/*
 * statics method for getting one hotel 
 * */
hotelSchema.statics.getOneHotel = async function(hotel_id) {
    const hotel = await this.findOne({ _id: hotel_id })

    return hotel
}

/*
 * statics method for getting hotel with user_id
 * */
hotelSchema.statics.getUserHotel = async function(user_id) {
    const hotel = await this.findOne({ user_id })

    return hotel
}

/*
 * statics method for updating hotel 
 * */
hotelSchema.statics.updateOneHotel = async function(hotelData, hotel_id) {
    const { hotelName, city, street, maxCount, phoneNumber, rentPerDay, description, currentBookings } = hotelData

    const hotel = await this.updateOne({ _id: hotel_id }, {
        $set: {
            hotelName,
            city,
            street,
            maxCount,
            phoneNumber,
            rentPerDay,
            description,
            currentBookings
        }
    })

    return hotel
}

/*
 * statics method for deleitng hotel 
 * */
hotelSchema.statics.deleteOneHotel = async function(hotel_id) {
    const hotel = await this.deleteOne({ _id: hotel_id })

    return hotel
}

module.exports = mongoose.model("Hotel", hotelSchema)

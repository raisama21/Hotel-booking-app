require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")

const connectDB = require("./config/connectDB")

const userRoutes = require("./routes/userRoutes")
const hotelRoutes = require("./routes/hotelRoutes")
const bookingRoutes = require("./routes/bookingRoutes")
const epaymentRoutes = require("./routes/epaymentRoutes.js")

/*
 * connect to mongodb database
 * */
connectDB()

/*
 * express app
 * */
const app = express()

/*
 * middleware for form data
 * */
app.use(express.urlencoded({ extended: true }))

/*
 * middleware for json
 * */
app.use(express.json())

/*
 * Routes
 * */
app.use("/api/user", userRoutes)
app.use("/api/hotel", hotelRoutes)
app.use("/api/booking", bookingRoutes)
app.use("/api/epayment", epaymentRoutes)

mongoose.connection.once("open", () => {
    console.log("Connected to mongodb database...")

    app.listen(process.env.PORT, () => {
        console.log(`server running on http://localhost:${process.env.PORT}`)
    })
})

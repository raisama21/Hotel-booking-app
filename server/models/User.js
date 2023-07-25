const { default: mongoose, Schema } = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user"
    },
    hotel_id: {
        type: String,
    }
}, { timestamps: true })

/*
 * static signup method
 * */
userSchema.statics.signup = async function(userName, email, password) {

    /* validation */
    if (!userName || !email || !password) {
        throw Error("All feild must be filled")
    }

    if (!validator.matches(userName, "^[a-zA-Z]+[0-9_\.\-]*$")) {
        throw Error("User name is not valid")
    }

    if (!validator.isEmail(email)) {
        throw Error("Email is not valid")
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Passowrd not strong enough")
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error("Email already in use")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({
        userName,
        email,
        password: hash
    })

    return user

}

/*
 * static signup method
 * */
userSchema.statics.login = async function(email, password) {

    if (!email || !password) {
        throw Error("All feild must be filled")
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error("Email or Password invalid")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error("Email or Password invalid")
    }

    return user

}

/*
 * static method for deleting user
 * */
userSchema.statics.deleteUser = async function(user_id) {

    const user = await this.deleteOne({ _id: user_id })

    return user

}

module.exports = mongoose.model("User", userSchema)

const User = require("../models/User");
const Hotel = require("../models/Hotel");
const Booking = require("../models/Booking");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "3d" });
};

async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const { _id, userName, role, hotel_id } = user;

        /* create a token */
        const token = createToken(user._id);

        res.status(200).json({ _id, userName, email, token, role, hotel_id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function signupUser(req, res) {
    const { userName, email, password } = req.body;

    try {
        const user = await User.signup(userName, email, password);
        const { _id, role, hotel_id } = user;

        /* create a token */
        const token = createToken(user._id);

        res.status(201).json({ _id, userName, email, token, role, hotel_id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deleteUser(req, res) {
    const _id = req.user._id;

    try {
        await User.deleteUser(_id);

        await Hotel.deleteMany({ user_id: _id });

        await Booking.deleteMany({ user_id: _id });

        res.status(204).json({
            message: "your account has been deleted successfully",
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getUserById(req, res) {
    const { user_id } = req.params;

    try {
        const user = await User.findOne({ _id: user_id }).select(
            "_id userName email ",
        );

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { loginUser, signupUser, deleteUser, getUserById };

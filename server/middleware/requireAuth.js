const jwt = require("jsonwebtoken")
const User = require("../models/User")

async function requireAuth(req, res, next) {

    // verify authentication
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: "Authorization token required" })
    }

    const token = authorization.split(" ")[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET_KEY)

        req.user = await User.findOne({ _id }).select('_id email userName role hotel_id')
        next()
    } catch (error) {
        res.status(401).json({ error: "Request is not authorized" })
    }

}

module.exports = { requireAuth }

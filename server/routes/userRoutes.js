const express = require("express")
const router = express.Router()
const { requireAuth } = require("../middleware/requireAuth")

const userController = require("../controllers/userController")

router.post("/login", userController.loginUser)

router.post("/signup", userController.signupUser)

router.use(requireAuth)
router.delete("/delete", userController.deleteUser)

router.get("/get-user-by-id/:user_id", userController.getUserById)

module.exports = router

const express = require("express");
const router = express.Router();
const epaymentController = require("../controllers/epaymentController");
const { requireAuth } = require("../middleware/requireAuth")

router.use(requireAuth)
router.post("/khalti-epayment", epaymentController.khaltiPaymentInitiate)

module.exports = router

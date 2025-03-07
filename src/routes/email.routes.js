const express = require("express");
const EmailController = require("../controllers/email.controller");

const router = express.Router();

router.post("/send", EmailController.sendEmail);

module.exports = router;

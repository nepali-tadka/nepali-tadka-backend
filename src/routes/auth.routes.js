const express = require("express");
const AuthController = require("../controllers/auth.controller");
const {
  checkDuplicateUsernameOrEmail,
} = require("../middleware/signup.middleware");

const router = express.Router();

router.post("/signup", checkDuplicateUsernameOrEmail, AuthController.signup);
router.post("/signin", AuthController.signin);
router.post("/signout", AuthController.signout);

module.exports = router;

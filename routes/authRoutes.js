const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const flash = require('connect-flash');

const { saveRedirectUrl, validateUserDataL } = require("../middleware");

const authController = require("../controllers/authController");

router
.route("/login")
.get(authController.renderLoginForm)
.post(saveRedirectUrl, validateUserDataL, passport.authenticate("local",{failureRedirect:'/login', failureFlash:true}),authController.login);

router.get("/logout", authController.logout);

module.exports = router;
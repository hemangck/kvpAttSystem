const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const wrapAsync = require("../utils/wrapAsync.js");
const authController = require('../controllers/authController.js');

router.get("/", homeController.renderHomePage);

router.get("/attributions", homeController.renderAttributionsPage);

// router.get('/signUpForm', wrapAsync(authController.renderSignupForm));
// router.post('/signUpForm/registerMember', wrapAsync(authController.signup));

module.exports = router;
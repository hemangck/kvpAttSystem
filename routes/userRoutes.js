const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const userController = require('../controllers/userController');
const authController = require('../controllers/authController.js');
const { isLoggedIn, validateKvpData, validateAttData } = require("../middleware.js");

// Route to render the CRoom and Data under Dashboard Home
router.get('/dashboardHome/:userId/dashboardCRoom',isLoggedIn, wrapAsync(userController.renderkTaiDboardCRoom));
router.get('/dashboardHome/:userId/dashboardData',isLoggedIn, wrapAsync(userController.renderkTaiDboardData));
router.get('/dashboardHome/:userId/registerMember',isLoggedIn, wrapAsync(authController.renderSignupForm));
router.post('/dashboardHome/:userId/registerMember',isLoggedIn, wrapAsync(authController.signup));

// routes to render forms in CRoom Dashboard
router.get('/dashboardHome/:userId/dashboardCRoom/regForm',isLoggedIn, wrapAsync(userController.renderRegForm));
router.get('/dashboardHome/:userId/dashboardCRoom/prAForm',isLoggedIn, wrapAsync(userController.renderPrAForm));
router.get('/dashboardHome/:userId/dashboardCRoom/attForm',isLoggedIn, wrapAsync(userController.renderAttendanceForm));
router.get('/dashboardHome/:userId/dashboardCRoom/poAForm',isLoggedIn, wrapAsync(userController.renderPoAForm));

// Roter to search students list
router.post('/dashboardHome/:userId/dashboardCRoom/attForm/studList',isLoggedIn, wrapAsync(userController.renderStudentsList));

// Route to save attendance data
router.post('/dashboardHome/:userId/dashboardCRoom/attForm/studList/saveAtt',isLoggedIn, wrapAsync(userController.saveAttendance));

module.exports = router;

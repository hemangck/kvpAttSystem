const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { isLoggedIn, validateKvpData, validateAttData, validateUserDataR, validateUserDataL  } = require("../middleware.js");

// Route to render dashboardhome
router.get("/",isLoggedIn, wrapAsync(userController.renderDBoardHome));

// Route to render the CRoom and Data under Dashboard Home
router.get('/dashboardCRoom',isLoggedIn, wrapAsync(userController.renderkTaiDboardCRoom));
router.get('/dashboardData',isLoggedIn, wrapAsync(userController.renderkTaiDboardData));
router.get('/registerMember',isLoggedIn, wrapAsync(authController.renderSignupForm));
router.post('/registerMember',isLoggedIn, validateUserDataR, wrapAsync(authController.renderSignupForm));
router.post('/registerMember/saveUser',isLoggedIn, wrapAsync(authController.signup));

// Routes to render forms in CRoom Dashboard
router.get('/dashboardCRoom/regForm',isLoggedIn, wrapAsync(userController.renderRegForm));
router.post('/dashboardCRoom/regForm',isLoggedIn, wrapAsync(userController.submitRegForm));

router.get('/dashboardCRoom/prAForm',isLoggedIn, wrapAsync(userController.renderPrAForm));
router.get('/dashboardCRoom/attForm',isLoggedIn, wrapAsync(userController.renderAttendanceForm));
router.get('/dashboardCRoom/poAForm',isLoggedIn, wrapAsync(userController.renderPoAForm));

// Route to search students list
router.post('/dashboardCRoom/attForm/studList',isLoggedIn, wrapAsync(userController.renderStudentsList));

// Route to save attendance data
router.post('/dashboardCRoom/attForm/studList/saveAtt',isLoggedIn, wrapAsync(userController.saveAttendance));


// Route to render add new student section and post action route to deal with the operation
router.get("/dashboardData/addNewStudent",isLoggedIn, wrapAsync(userController.renderNewHome));
router.get("/dashboardData/addNewStudent/mulEnteries",isLoggedIn, wrapAsync(userController.renderMulEntries));
router.get("/dashboardData/addNewStudent/manage-data/new",isLoggedIn, wrapAsync(userController.renderNewForm));
router.post("/dashboardData/addNewStudent/manage-data",isLoggedIn,validateKvpData, wrapAsync(userController.createData));
router.post('/dashboardData/addNewStudent/mulEnteries/upload',isLoggedIn, upload.single('csvFile'), wrapAsync(userController.uploadFile));

// Route to search kvp student data based on form
router.get("/dashboardData/kvpDataForm",isLoggedIn, wrapAsync(userController.renderFormPage));
router.post("/dashboardData/kvpDataForm/manage-data",isLoggedIn, wrapAsync(userController.index));

// Route to render the CRUD operations page and routes to deal with those operations
router.get("/dashboardData/crudData/manage-data/:id",isLoggedIn, wrapAsync(userController.showData));
router.get("/dashboardData/crudData/manage-data/:id/edit",isLoggedIn, wrapAsync(userController.renderEditForm));

// Route to update and delete the data
router
.route("/dashboardData/crudData/manage-data/:id")
.put(isLoggedIn, wrapAsync(userController.updateData))
.delete(isLoggedIn,wrapAsync(userController.deleteData));

// router.put("/dashboardData/crudData/manage-data/:id",isLoggedIn,validateKvpData, wrapAsync(userController.updateData));
// router.delete("/dashboardData/crudData/manage-data/:id",isLoggedIn,validateKvpData,wrapAsync(userController.deleteData));

// Route to render date page based on form details
router.get("/dashboardData/mis",isLoggedIn, wrapAsync(userController.renderMisDates));
router.get("/dashboardData/mis/:date",isLoggedIn, wrapAsync(userController.renderMisPage));

// Route to download template csv file and upload the csv file for successful database insertion
router.post('/dashboardData/mis/:date/results/download',isLoggedIn, wrapAsync(userController.downloadCSV));

// Route for mis results for get and post operation
router
.route("/dashboardData/mis/:date/results")
.get(isLoggedIn, wrapAsync(userController.renderMisResults))
.post(isLoggedIn, wrapAsync(userController.renderMisResults));


module.exports = router;

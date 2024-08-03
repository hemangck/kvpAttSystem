// const express = require("express");
// const router = express.Router();
// const wrapAsync = require("../utils/wrapAsync.js");
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
// const adminController = require("../controllers/adminController");
// const { isLoggedIn, validateKvpData, validateAttData } = require("../middleware.js");

// // route to render dashboardhome
// router.get("/dashboardHome",isLoggedIn, wrapAsync(adminController.renderDBoardHome));
// // route to render add new student section and post action route to deal with the operation
// router.get("/dashboardHome/:userId/dashboardData/addNewStudent",isLoggedIn, wrapAsync(adminController.renderNewHome));
// router.get("/dashboardHome/:userId/dashboardData/addNewStudent/mulEnteries",isLoggedIn, wrapAsync(adminController.renderMulEntries));
// router.get("/dashboardHome/:userId/dashboardData/addNewStudent/manage-data/new",isLoggedIn, wrapAsync(adminController.renderNewForm));
// router.post("/dashboardHome/:userId/dashboardData/addNewStudent/manage-data",isLoggedIn,validateKvpData, wrapAsync(adminController.createData));
// router.post('/dashboardHome/:userId/dashboardData/addNewStudent/mulEnteries/upload',isLoggedIn,validateKvpData, upload.single('csvFile'), wrapAsync(adminController.uploadFile));

// // route to search kvp student data based on form
// router.get("/dashboardHome/:userId/dashboardData/kvpDataForm",isLoggedIn, wrapAsync(adminController.renderFormPage));
// router.post("/dashboardHome/:userId/dashboardData/kvpDataForm/manage-data",isLoggedIn, wrapAsync(adminController.index));

// // route to render the CRUD operations page and routes to deal with those operations
// router.get("/dashboardHome/:userId/dashboardData/crudData/manage-data/:id",isLoggedIn, wrapAsync(adminController.showData));

// router.get("/dashboardHome/:userId/dashboardData/crudData/manage-data/:id/edit",isLoggedIn,validateKvpData, wrapAsync(adminController.renderEditForm));
// router.put("/dashboardHome/:userId/dashboardData/crudData/manage-data/:id",isLoggedIn,validateKvpData, wrapAsync(adminController.updateData));
// router.delete("/dashboardHome/:userId/dashboardData/crudData/manage-data/:id",isLoggedIn,validateKvpData,wrapAsync(adminController.deleteData));

// // route to render date page based on form details
// router.get("/dashboardHome/:userId/dashboardData/mis",isLoggedIn, wrapAsync(adminController.renderMisDates));
// router.get("/dashboardHome/:userId/dashboardData/mis/:date",isLoggedIn, wrapAsync(adminController.renderMisPage));

// // route to render the attendance records page to deal with it
// router.post("/dashboardHome/:userId/dashboardData/mis/:date/results",isLoggedIn, wrapAsync(adminController.renderMisResults));
// router.get("/dashboardHome/:userId/dashboardData/mis/:date/results",isLoggedIn, wrapAsync(adminController.renderMisResults));

// // route to download template csv file and upload the csv file for successful database insertion
// router.get('/dashboardHome/:userId/dashboardData/mis/:date/results/download',isLoggedIn, wrapAsync(adminController.downloadCSV));

// module.exports = router;
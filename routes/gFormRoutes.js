const express = require('express');
const router = express.Router();
const gFormController = require('../controllers/gFormController');
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, validateKvpData } = require("../middleware.js");

router.post('/kvpDataGForm/addNewStudent/manage-data/new',validateKvpData, wrapAsync(gFormController.createDataGForm));

module.exports = router;
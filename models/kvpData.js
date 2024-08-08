const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kvpDataSchema = new Schema({
  Sname: {
    type: String,
    required: true,
    trim: true
  },
  SAddress: {
    type: String,
    required: true,
    trim: true
  },
  Caste: {
    type: String,
    required: true,
    trim: true
  },
  SubCaste: {
    type: String,
    trim: true
  },
  ContactNum: {
    type: String,
    required: true,
    // match: /^[0-9]{10}$/, // Ensure it is a 10-digit number
    trim: true
  },
  AadharNo: {
    type: String,
    required: true,
    // match: /^[0-9]{4}\s?[0-9]{4}\s?[0-9]{6}$/, // Ensure it is a 12-digit number with optional spaces
    trim: true
  },
  DOB: {
    type: String,
    required: true
  },
  Taluka: {
    type: String,
    required: true,
    trim: true
  },
  Std: {
    type: String,
    required: true,
    trim: true
  },
  School: {
    type: String,
    required: true,
    trim: true
  },
  Class: {
    type: String,
    required: true,
    trim: true
  },
  Group: {
    type: String,
    required: true,
    trim: true
  },
  HOD: {
    type: String,
    required: true,
    trim: true
  },
  Supervisor: {
    type: String,
    required: true,
    trim: true
  },
  KishoriTai: {
    type: String,
    required: true,
    trim: true
  }
});

const kvpData = mongoose.model("kvpData", kvpDataSchema);
module.exports = kvpData;

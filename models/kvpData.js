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
    trim: true,
    // default: "NA"
  },
  Caste: {
    type: String,
    required: true,
    trim: true,
    // default: "NA"
  },
  SubCaste: {
    type: String,
    trim: true,
    // default: "NA"
  },
  ContactNum: {
    type: String,
    required: true,
    // match: /^[0-9]{10}$/, // Ensure it is a 10-digit number
    trim: true,
    // default: "NA"
  },
  AadharNo: {
    type: String,
    required: true,
    // match: /^[0-9]{4}\s?[0-9]{4}\s?[0-9]{6}$/, // Ensure it is a 12-digit number with optional spaces
    trim: true,
    // default: "NA"
  },
  DOB: {
    type: String,
    required: true,
    // default: "NA"
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

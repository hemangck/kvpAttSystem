const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kvpDataSchema = new Schema({
  Sname: String,
  SAddress: String,
  Caste: String,
  SubCaste: String,
  ContactNum:String,
  AadharNo: String,
  DOB: String,
  Taluka: String,
  Std: Number,
  School: String,
  Class: Number,
  Group: String,
  HOD: String,
  Supervisor: String,
  KishoriTai: String,
});

const kvpData = mongoose.model("kvpData", kvpDataSchema);
module.exports = kvpData;

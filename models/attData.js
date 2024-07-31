const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attDataSchema = new Schema({
    Taluka: String,
    School: String,
    Class: Number,
    Group: String,
    HOD: String,
    Supervisor: String,
    KishoriTai: String,
    Date: String,
    Month: String,
    Week: Number,
    TimeSlot: String, // Ensure TimeSlot is included here
    totalCount: {
        type: Number,
        default: 0
    },
    presentCount: {
        type: Number,
        default: 0
    },
    absentCount: {
        type: Number,
        default: 0
    },
    Attendance: [
        {
            _id: false,
            name: String,
            std: String,
            status: {
                type: String,
                enum: ['present', 'absent'],
                default: 'absent'
            }
        }
    ]
});

const AttData = mongoose.model("AttData", attDataSchema);
module.exports = AttData;

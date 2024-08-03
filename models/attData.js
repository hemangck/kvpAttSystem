const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attDataSchema = new Schema({
    Taluka: {
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
        type: Number,
        required: true,
        min: 1,
        max: 12
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
    },
    Date: {
        type: String,
        required: true
    },
    Month: {
        type: String,
        required: true,
        trim: true
    },
    Week: {
        type: Number,
        required: true,
        min: 1,
        max: 52
    },
    TimeSlot: {
        type: String,
        required: true,
        trim: true
    },
    totalCount: {
        type: Number,
        default: 0,
        min: 0
    },
    presentCount: {
        type: Number,
        default: 0,
        min: 0
    },
    absentCount: {
        type: Number,
        default: 0,
        min: 0
    },
    Attendance: [
        {
            _id: false,
            name: {
                type: String,
                required: true,
                trim: true
            },
            std: {
                type: Number,
                required: true,
                min: 1,
                max: 12
            },
            status: {
                type: String,
                enum: ['present', 'absent'],
                default: 'absent',
                required: true
            }
        }
    ]
});

const AttData = mongoose.model("AttData", attDataSchema);
module.exports = AttData;

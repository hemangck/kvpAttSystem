const kvpData = require("../models/kvpData");
const attData = require("../models/attData");

// controller to render different forms
module.exports.renderAttendanceForm = async (req, res) => {
    // const allkvpData = await kvpData.find({});
    const Talukas = await kvpData.distinct('Taluka');
    const Schools = await kvpData.distinct('School');
    const Classes = await kvpData.distinct('Class');
    const Groups = await kvpData.distinct('Group');
    const HODs = await kvpData.distinct('HOD');
    const Supervisors = await kvpData.distinct('Supervisor');
    const KishoriTais = await kvpData.distinct('KishoriTai');
    res.render("user/attFormData1", { Talukas, Schools, Classes, Groups, HODs, Supervisors, KishoriTais });
};

// controller to render different forms
module.exports.renderStudentsList = async (req, res) => {
    
    const attData0 = req.body.attData;

    const taluka0 =  attData0.Taluka;
    const school0 =  attData0.School;
    const class0 =  attData0.Class;
    const group0 =  attData0.Group;
    const hod0 =  attData0.HOD;
    const supV0 =  attData0.Supervisor;
    const kTai0 =  attData0.KishoriTai;
    const date0 =  attData0.Date;
    const month0 =  attData0.Month;
    const week0 =  attData0.Week;
    const tSlot0 =  attData0.tSlot;


    const studentsData = await kvpData.find(
        {
            Taluka: taluka0,
            School: school0,
            Class: class0,
            Group: group0,
            HOD: hod0,
            Supervisor: supV0,
            KishoriTai: kTai0,
        },
        {
            Sname: 1,
            Std: 1,
        }
    );

  // Function to get the total count of unique Sname values
    function getTotalUniqueSnamesCount(array) {
        const uniqueSnames = new Set(array.map(item => item.Sname));
        return uniqueSnames.size;
    }

    const totalCount = getTotalUniqueSnamesCount(studentsData);

    res.render("user/attFormData2", { taluka0, school0, class0, group0, hod0, supV0, kTai0, date0, month0, week0, tSlot0, studentsData, totalCount });
};


module.exports.renderkTaiDboardCRoom = async (req, res) => {
    const { name,role } = req.user;

    res.render("user/kTaiDboard_cRoom",{ name,role });
};

module.exports.renderkTaiDboardData = async (req, res) => {
    const { name,role } = req.user;

    res.render("user/kTaiDboard_data",{ name,role });
};

module.exports.renderPrAForm = async (req, res) => {
    res.render("forms/prAForm");
};

module.exports.renderPoAForm = async (req, res) => {
    res.render("forms/poAForm");
};

module.exports.renderRegForm = async (req, res) => {
    res.render("forms/regForm");
};


module.exports.saveAttendance = async (req, res) => {
    try {
        const newAttData = req.body.attData;

        // Log the data to verify its structure
        console.log('Received attendance data:', newAttData.Attendance);

        // Check if Attendance is a valid JSON string
        if (typeof newAttData.Attendance === 'string') {
            // Parsing the attendance data
            const AttendanceDataFinal = JSON.parse(newAttData.Attendance);

            // Ensure AttendanceDataFinal is an array
            if (Array.isArray(AttendanceDataFinal.attendanceData)) {
                // Update present and absent counts
                const presentCount = AttendanceDataFinal.attendanceData.filter(item => item.status === 'present').length;
                const absentCount = AttendanceDataFinal.attendanceData.filter(item => item.status === 'absent').length;

                // Update newAttData with the parsed data and counts
                newAttData.Attendance = AttendanceDataFinal.attendanceData;
                newAttData.presentCount = presentCount;
                newAttData.absentCount = absentCount;
                newAttData.TimeSlot = AttendanceDataFinal.TimeSlot; // Ensure TimeSlot is included

                // Initialize the model and save to the database
                const finalAttInfo = new attData(newAttData);

                await finalAttInfo.save();

                req.flash("success", "Attendance Recorded Successfully!");
                res.redirect("/dashboardHome/:userId/dashboardCRoom/attForm");
            } else {
                throw new Error('Attendance data is not in the expected format.');
            }
        } else {
            throw new Error('Attendance data is not a valid JSON string.');
        }
    } catch (e) {
        console.error('Error saving attendance:', e.message); // Log the error for debugging
        req.flash("error", e.message);
        res.redirect("/dashboardHome/:userId/dashboardCRoom/attForm");
    }
};

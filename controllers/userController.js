const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const { Parser } = require('json2csv');
const kvpData = require("../models/kvpData");
const attData = require("../models/attData");

// controller to render different forms
module.exports.renderAttendanceForm = async (req, res) => {
    // const allkvpData = await kvpData.find({});

    // if (req.session.attendanceSubmitted) {
    //     req.flash("error", "You have already submitted the attendance.");
    //     return res.redirect(`/${userId}/dashboard`);
    // }

    // res.set({
    //     'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    //     'Pragma': 'no-cache',
    //     'Expires': '0',
    //     'Surrogate-Control': 'no-store'
    // });

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

    res.render("user/attFormData2", { taluka0, school0, class0, group0, hod0, supV0, kTai0, date0, month0, week0, tSlot0, studentsData });
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
    res.render("forms/reportsForm");
};

module.exports.renderRegForm = async (req, res) => {
    res.render("forms/regForm");
};

module.exports.submitRegForm = async (req, res) => {
    try{
        const gFormKvpData = new kvpData(req.body);
        await gFormKvpData.save();
        req.flash("success", "Student Added Successfully!");
        return res.redirect(`/${req.user._id}/dashboard`);
    } catch (e) {
        console.error('Error Storing data:', e.message); // Log the error for debugging
        req.flash("error", e.message);
        return res.redirect(`/${req.user._id}/dashboard/dashboardCRoom/regForm`); // Assuming userId is stored in req.user._id
    }
    
};

module.exports.saveAttendance = async (req, res) => {
    try {
        const newAttData = req.body.attData;

        if (typeof newAttData.Attendance === 'string') {
            // Parsing the attendance data
            const AttendanceDataFinal = JSON.parse(newAttData.Attendance);

            if (Array.isArray(AttendanceDataFinal.attendanceData) && AttendanceDataFinal.attendanceData.length > 0) {
                // Update newAttData with the parsed data
                newAttData.Attendance = AttendanceDataFinal.attendanceData;

                // Initialize the model and save to the database
                const finalAttInfo = new attData(newAttData);

                await finalAttInfo.save();

                req.flash("success", "Attendance Recorded Successfully!");
                return res.redirect(`/${req.user._id}/dashboard`); // Assuming userId is stored in req.user._id
            } else {
                throw new Error('Attendance table is empty ! Please select appropriate options !!');
            }
        } else {
            throw new Error('Attendance data is not a valid JSON string.');
        }
    } catch (e) {
        console.error('Error saving attendance:', e.message); // Log the error for debugging
        req.flash("error", e.message);
        return res.redirect(`/${req.user._id}/dashboard/dashboardCRoom/attForm`); // Assuming userId is stored in req.user._id
    }
};

// to render dashboard home page

module.exports.renderDBoardHome = async (req, res) => {

    const { name,role } = req.user;

    res.render("user/DboardHome",{ name,role });
};

// to render manage data form page
module.exports.renderFormPage = async (req, res) => {

    const Talukas = await kvpData.distinct('Taluka');
    const Schools = await kvpData.distinct('School');
    const Classes = await kvpData.distinct('Class');
    const Groups = await kvpData.distinct('Group');
    const HODs = await kvpData.distinct('HOD');
    const Supervisors = await kvpData.distinct('Supervisor');
    const KishoriTais = await kvpData.distinct('KishoriTai');

    res.render("admin/kvpInfoForm",{Talukas, Schools, Classes, Groups, HODs, Supervisors, KishoriTais});
};

// to render manage data page based on form input parameters
module.exports.index = async (req, res) => {
    const allKvpData = await kvpData.find({});

    const allFormData = req.body.formData;

    const TalukaF = allFormData.Taluka;
    const SchoolF = allFormData.School;
    const ClassF = allFormData.Class;
    const GroupF = allFormData.Group;
    const HODF = allFormData.HOD;
    const SupervisorF = allFormData.Supervisor;
    const KishoriTaiF = allFormData.KishoriTai;

    const filteredData = await kvpData.find(
        {
            Taluka: TalukaF,
            School: SchoolF,
            Class: ClassF,
            Group: GroupF,
            HOD: HODF,
            Supervisor: SupervisorF,
            KishoriTai: KishoriTaiF
        },
        {
            _id: 1,
            Sname: 1,
            SAddress: 1,
            Caste: 1,
            SubCaste: 1,
            ContactNum: 1,
            AadharNo: 1,
            DOB: 1,
            Std: 1,
            Taluka: 1,
            School: 1,
            Class: 1,
            Group: 1,
            HOD: 1,
            Supervisor: 1,
            KishoriTai: 1,
        }
    );


    res.render("admin/index", { filteredData });
};

// to render add new student form
module.exports.renderNewForm = (req, res) => {
    res.render("admin/new");
};

// to render add new student home page
module.exports.renderNewHome = (req, res) => {
    res.render("admin/newHome");
};

// to render multiple enteries page
module.exports.renderMulEntries = (req, res) => {
    res.render("admin/mulEnteries");
};

// to show data page based on particular entry
module.exports.showData = async (req, res) => {
    const { id } = req.params;
    const allKvpData = await kvpData.findById(id);
    res.render("admin/show", { allKvpData });
};


// to create new data by using form
module.exports.createData = async (req, res, next) => {
    try{
        const newKvpData = new kvpData(req.body.kvpData);
        await newKvpData.save();
        req.flash("success", "Student Added Successfully!");
        return res.redirect(`/${req.user._id}/dashboard`);
    } catch (e) {
        console.error('Error while adding entry:', e.message); // Log the error for debugging
        req.flash("error", e.message);
        return res.redirect(`/${req.user._id}/dashboard/dashboardData/addNewStudent/manage-data/new`); // Assuming userId is stored in req.user._id
    }
    
};

// to render edit form of particular entry
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const kvpDataVar = await kvpData.findById(id);
    const dateOfBirth = kvpDataVar.DOB;
    res.render("admin/edit", { kvpDataVar,dateOfBirth });
};

// to update data based on particular entry
module.exports.updateData = async (req, res) => {
    const { id } = req.params;
    await kvpData.findByIdAndUpdate(id, { ...req.body.kvpDataVar });
    res.redirect(`/${req.user._id}/dashboard/dashboardData/crudData/manage-data/${id}`);
};

// to delete data based on particular entry
module.exports.deleteData = async (req, res) => {
    const { userId, id } = req.params;

    await kvpData.findByIdAndDelete(id);
    res.redirect(`/${req.user._id}/dashboard/dashboardData/kvpDataForm/manage-data`);
};

// to render mis dates page
module.exports.renderMisDates = async (req, res) => {
    try {

        const Dates = await attData.distinct('Date');       

        res.render("admin/showDates", { Dates });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

// to render mis page
module.exports.renderMisPage = async (req, res) => {
    const {date}  = req.params;

    const allAttData = await attData.find(
        {
            Date: date
        },
        {
            _id: 0,
            Taluka: 1,
            School: 1,
            Class: 1,
            Group: 1,
            HOD: 1,
            Supervisor: 1,
            KishoriTai: 1,
            TimeSlot: 1,
            Attendance: 1,
        }
    );
    
    // Function to get unique values based on 'Taluka'
   
    const uniqueTalukas = new Set();
    const uniqueSchools = new Set();
    const uniqueClasses = new Set();
    const uniqueGroups = new Set();
    const uniqueHODs = new Set();
    const uniqueSupervisors = new Set();
    const uniqueKishoriTais = new Set();
    const uniqueTimeSlots = new Set();
    
    for (const item of allAttData) {
      uniqueTalukas.add(item.Taluka);
      uniqueSchools.add(item.School);
      uniqueClasses.add(item.Class);
      uniqueGroups.add(item.Group);
      uniqueHODs.add(item.HOD);
      uniqueSupervisors.add(item.Supervisor);
      uniqueKishoriTais.add(item.KishoriTai);
      uniqueTimeSlots.add(item.TimeSlot);
    }    

    const Talukas = Array.from(uniqueTalukas);
    const Schools = Array.from(uniqueSchools);
    const Classes = Array.from(uniqueClasses);
    const Groups = Array.from(uniqueGroups);
    const HODs = Array.from(uniqueHODs);
    const Supervisors = Array.from(uniqueSupervisors);
    const KishoriTais = Array.from(uniqueKishoriTais);
    const TimeSlots = Array.from(uniqueTimeSlots);
  
    
    res.render("admin/attInfoForm", { date, Talukas, Schools, Classes, Groups, HODs, Supervisors, KishoriTais, TimeSlots });
};


// to render mis results
module.exports.renderMisResults = async (req, res) => {
    try {

        const misAttData = req.body.misData;

        const TalukaF = misAttData.Taluka;
        const SchoolF = misAttData.School;
        const ClassF = misAttData.Class;
        const GroupF = misAttData.Group;
        const HODF = misAttData.HOD;
        const SupervisorF = misAttData.Supervisor;
        const KishoriTaiF = misAttData.KishoriTai;
        const DateF = misAttData.Date;
        const TimeSlotF = misAttData.tSlot;


        const filteredData = await attData.find(
            {
                Taluka: TalukaF,
                School: SchoolF,
                Class: ClassF,
                Group: GroupF,
                HOD: HODF,
                Supervisor: SupervisorF,
                KishoriTai: KishoriTaiF,
                Date: DateF,
                TimeSlot: TimeSlotF
            },
            {
                _id: 0,
                Taluka: 1,
                School: 1,
                Class: 1,
                Group: 1,
                HOD: 1,
                Supervisor: 1,
                KishoriTai: 1,
                Date: 1,
                TimeSlot: 1,
                Attendance: 1,
                totalCount: 1,
                presentCount: 1,
                absentCount: 1
            }
        );


        // console.log(filteredData);

        const fields = [
            'Taluka',
            'School',
            'Class',
            'Group',
            'HOD',
            'Supervisor',
            'KishoriTai',
            'Date',
            'TimeSlot'
        ]

        res.render("admin/showAtt", { filteredData });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

// to do upload file operation
module.exports.uploadFile = async (req, res) => {
    const filePath = path.join(__dirname, '../', req.file.path);
    const jsonData = [];

    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
            jsonData.push(row);
        })
        .on('end', async () => {
            try {
                await kvpData.insertMany(jsonData);
                res.send('Data has been successfully saved to the database.');
            } catch (err) {
                console.error('Error saving data to the database', err);
                res.status(500).send('Error saving data to the database.');
            } finally {
                fs.unlinkSync(filePath);  // Clean up the uploaded file
            }
        });
};

// to download csv of attendance data
exports.downloadCSV = async (req, res) => {
    // try {

        const formData = req.body.csvData;

        // console.log(formData);


        // const formData = req.body.headings;

        // console.log(formData);

        const TalukaF = formData.Taluka;
        const SchoolF = formData.School;
        const ClassF = formData.Class;
        const GroupF = formData.Group;
        const HODF = formData.HOD;
        const SupervisorF = formData.Supervisor;
        const KishoriTaiF = formData.KishoriTai;
        const DateF = formData.Date;
        const TimeSlotF = formData.TimeSlot; 

        const tFCh = TalukaF.charAt(0);
        const sFCh = SchoolF.charAt(0);
        const gFCh = GroupF.charAt(0);
        const hFCh = HODF.charAt(0);
        const spFCh = SupervisorF.charAt(0);
        const kFCh = KishoriTaiF.charAt(0);

        // const fileName = `${tFCh}${sFCh}${ClassF}${gFCh}${hFCh}${spFCh}${kFCh}_${DateF}_${TimeSlotF}`;

        // console.log(fileName);
        
        // console.log(TalukaF);

        const filteredData = await attData.find(
            {
                Taluka: TalukaF,
                School: SchoolF,
                Class: ClassF,
                Group: GroupF,
                HOD: HODF,
                Supervisor: SupervisorF,
                KishoriTai: KishoriTaiF,
                Date: DateF,
                TimeSlot: TimeSlotF
            },
            {
                _id: 0,
                'Attendance.name': 1,
                'Attendance.std': 1,
                'Attendance.status': 1,
                totalCount: 1,
                presentCount: 1,
                absentCount: 1
            }
        ).lean();  // use .lean() to get plain JavaScript objects
        
        // console.log(filteredData);

        // Flatten the structure to make it suitable for CSV
        const flatData = filteredData.map(record => {
            return record.Attendance.map(att => ({
                ...att,
                // We don't include static fields here; they will be included in a header row instead
            }));
        }).flat();

        // Static fields to be included only once in the CSV header
        const staticFields = {
            Taluka: TalukaF,
            School: SchoolF,
            Class: ClassF,
            Group: GroupF,
            HOD: HODF,
            Supervisor: SupervisorF,
            KishoriTai: KishoriTaiF,
            Date: DateF,
            TimeSlot: TimeSlotF,
            totalCount: filteredData[0]?.totalCount || '',
            presentCount: filteredData[0]?.presentCount || '',
            absentCount: filteredData[0]?.absentCount || ''
        };

        // Combine static fields with dynamic data
        const combinedData = [
            staticFields,
            ...flatData.map(record => ({
                ...record,
                // totalCount: staticFields.totalCount,
                // presentCount: staticFields.presentCount,
                // absentCount: staticFields.absentCount
            }))
        ];

        const fields = [
            'Taluka',
            'School',
            'Class',
            'Group',
            'HOD',
            'Supervisor',
            'KishoriTai',
            'Date',
            'TimeSlot',
            'name', 
            'std', 
            'status', 
            'totalCount', 
            'presentCount', 
            'absentCount'
        ];
        const opts = { fields };

        try {
            const parser = new Parser(opts);
            const csv = parser.parse(combinedData);

            // Define the output path and ensure the directory exists
            const outputDir = path.join(__dirname, '../downloads');
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            const outputPath = path.join(outputDir, 'attendance.csv');
            fs.writeFileSync(outputPath, csv);

            res.download(outputPath, 'attendance.csv', (err) => {
                if (err) {
                    console.error(err);
                }
                fs.unlinkSync(outputPath);  // Clean up the generated CSV file
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error generating CSV');
        }
};

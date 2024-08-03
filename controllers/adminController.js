// const fs = require('fs');
// const path = require('path');
// const csvParser = require('csv-parser');
// const { Parser } = require('json2csv');
// const kvpData = require("../models/kvpData");
// const attData = require("../models/attData");

// // to render dashboard home page

// module.exports.renderDBoardHome = async (req, res) => {

//     const { name,role } = req.user;

//     res.render("user/DboardHome",{ name,role });
// };

// // to render manage data form page
// module.exports.renderFormPage = async (req, res) => {

//     const Talukas = await kvpData.distinct('Taluka');
//     const Schools = await kvpData.distinct('School');
//     const Classes = await kvpData.distinct('Class');
//     const Groups = await kvpData.distinct('Group');
//     const HODs = await kvpData.distinct('HOD');
//     const Supervisors = await kvpData.distinct('Supervisor');
//     const KishoriTais = await kvpData.distinct('KishoriTai');

//     res.render("admin/kvpInfoForm",{Talukas, Schools, Classes, Groups, HODs, Supervisors, KishoriTais});
// };

// // to render manage data page based on form input parameters
// module.exports.index = async (req, res) => {
//     const allKvpData = await kvpData.find({});

//     const allFormData = req.body.formData;

//     const TalukaF = allFormData.Taluka;
//     const SchoolF = allFormData.School;
//     const ClassF = allFormData.Class;
//     const GroupF = allFormData.Group;
//     const HODF = allFormData.HOD;
//     const SupervisorF = allFormData.Supervisor;
//     const KishoriTaiF = allFormData.KishoriTai;

//     const filteredData = await kvpData.find(
//         {
//             Taluka: TalukaF,
//             School: SchoolF,
//             Class: ClassF,
//             Group: GroupF,
//             HOD: HODF,
//             Supervisor: SupervisorF,
//             KishoriTai: KishoriTaiF
//         },
//         {
//             _id: 1,
//             Sname: 1,
//             SAddress: 1,
//             Caste: 1,
//             SubCaste: 1,
//             ContactNum: 1,
//             AadharNo: 1,
//             DOB: 1,
//             Std: 1,
//             Taluka: 1,
//             School: 1,
//             Class: 1,
//             Group: 1,
//             HOD: 1,
//             Supervisor: 1,
//             KishoriTai: 1,
//         }
//     );


//     res.render("admin/index", { filteredData });
// };

// // to render add new student form
// module.exports.renderNewForm = (req, res) => {
//     res.render("admin/new");
// };

// // to render add new student home page
// module.exports.renderNewHome = (req, res) => {
//     res.render("admin/newHome");
// };

// // to render multiple enteries page
// module.exports.renderMulEntries = (req, res) => {
//     res.render("admin/mulEnteries");
// };

// // to show data page based on particular entry
// module.exports.showData = async (req, res) => {
//     const { id } = req.params;
//     const allKvpData = await kvpData.findById(id);
//     res.render("admin/show", { allKvpData });
// };


// // to create new data by using form
// module.exports.createData = async (req, res, next) => {
//     const newKvpData = new kvpData(req.body.kvpData);
//     await newKvpData.save();
//     res.send("Data Added Successfully");
// };

// // to render edit form of particular entry
// module.exports.renderEditForm = async (req, res) => {
//     const { id } = req.params;
//     const kvpDataVar = await kvpData.findById(id);
//     const dateOfBirth = kvpDataVar.DOB;
//     res.render("admin/edit", { kvpDataVar,dateOfBirth });
// };

// // to update data based on particular entry
// module.exports.updateData = async (req, res) => {
//     const { id } = req.params;
//     await kvpData.findByIdAndUpdate(id, { ...req.body.kvpDataVar });
//     res.redirect(`/dashboardHome/:userId/dashboardData/crudData/manage-data/${id}`);
// };

// // to delete data based on particular entry
// module.exports.deleteData = async (req, res) => {
//     const { id } = req.params;
//     await kvpData.findByIdAndDelete(id);
//     res.redirect("/dashboardHome/:userId/dashboardData/crudData/manage-data");
// };

// // to render mis dates page
// module.exports.renderMisDates = async (req, res) => {
//     try {

//         const Dates = await attData.distinct('Date');       

//         res.render("admin/showDates", { Dates });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server Error');
//     }
// }

// // to render mis page
// module.exports.renderMisPage = async (req, res) => {
//     const {date}  = req.params;

//     const allAttData = await attData.find(
//         {
//             Date: date
//         },
//         {
//             _id: 0,
//             Taluka: 1,
//             School: 1,
//             Class: 1,
//             Group: 1,
//             HOD: 1,
//             Supervisor: 1,
//             KishoriTai: 1,
//             TimeSlot: 1,
//             Attendance: 1,
//         }
//     );
    
//     // Function to get unique values based on 'Taluka'
   
//     const uniqueTalukas = new Set();
//     const uniqueSchools = new Set();
//     const uniqueClasses = new Set();
//     const uniqueGroups = new Set();
//     const uniqueHODs = new Set();
//     const uniqueSupervisors = new Set();
//     const uniqueKishoriTais = new Set();
//     const uniqueTimeSlots = new Set();
    
//     for (const item of allAttData) {
//       uniqueTalukas.add(item.Taluka);
//       uniqueSchools.add(item.School);
//       uniqueClasses.add(item.Class);
//       uniqueGroups.add(item.Group);
//       uniqueHODs.add(item.HOD);
//       uniqueSupervisors.add(item.Supervisor);
//       uniqueKishoriTais.add(item.KishoriTai);
//       uniqueTimeSlots.add(item.TimeSlot);
//     }    

//     const Talukas = Array.from(uniqueTalukas);
//     const Schools = Array.from(uniqueSchools);
//     const Classes = Array.from(uniqueClasses);
//     const Groups = Array.from(uniqueGroups);
//     const HODs = Array.from(uniqueHODs);
//     const Supervisors = Array.from(uniqueSupervisors);
//     const KishoriTais = Array.from(uniqueKishoriTais);
//     const TimeSlots = Array.from(uniqueTimeSlots);
  
    
//     res.render("admin/attInfoForm", { date, Talukas, Schools, Classes, Groups, HODs, Supervisors, KishoriTais, TimeSlots });
// };


// // to render mis results
// module.exports.renderMisResults = async (req, res) => {
//     try {

//         const misAttData = req.body.misData;

//         const TalukaF = misAttData.Taluka;
//         const SchoolF = misAttData.School;
//         const ClassF = misAttData.Class;
//         const GroupF = misAttData.Group;
//         const HODF = misAttData.HOD;
//         const SupervisorF = misAttData.Supervisor;
//         const KishoriTaiF = misAttData.KishoriTai;
//         const DateF = misAttData.Date;
//         const TimeSlotF = misAttData.tSlot;


//         const filteredData = await attData.find(
//             {
//                 Taluka: TalukaF,
//                 School: SchoolF,
//                 Class: ClassF,
//                 Group: GroupF,
//                 HOD: HODF,
//                 Supervisor: SupervisorF,
//                 KishoriTai: KishoriTaiF,
//                 Date: DateF,
//                 TimeSlot: TimeSlotF
//             },
//             {
//                 _id: 0,
//                 Taluka: 1,
//                 School: 1,
//                 Class: 1,
//                 Group: 1,
//                 HOD: 1,
//                 Supervisor: 1,
//                 KishoriTai: 1,
//                 Date: 1,
//                 TimeSlot: 1,
//                 Attendance: 1,
//                 totalCount: 1,
//                 presentCount: 1,
//                 absentCount: 1
//             }
//         );


//         // console.log(filteredData);

//         const fields = [
//             'Taluka',
//             'School',
//             'Class',
//             'Group',
//             'HOD',
//             'Supervisor',
//             'KishoriTai',
//             'Date',
//             'TimeSlot'
//         ]

//         res.render("admin/showAtt", { filteredData });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server Error');
//     }
// }

// // to do upload file operation
// module.exports.uploadFile = async (req, res) => {
//     const filePath = path.join(__dirname, '../', req.file.path);
//     const jsonData = [];

//     fs.createReadStream(filePath)
//         .pipe(csvParser())
//         .on('data', (row) => {
//             jsonData.push(row);
//         })
//         .on('end', async () => {
//             try {
//                 await kvpData.insertMany(jsonData);
//                 res.send('Data has been successfully saved to the database.');
//             } catch (err) {
//                 console.error('Error saving data to the database', err);
//                 res.status(500).send('Error saving data to the database.');
//             } finally {
//                 fs.unlinkSync(filePath);  // Clean up the uploaded file
//             }
//         });
// };

// // to download csv of attendance data
// exports.downloadCSV = async (req, res) => {
//     try {

//         // const formData = req.body.headings;

//         // console.log(formData);

//         // const TalukaF = formData.Taluka;
//         // const SchoolF = formData.School;
//         // const ClassF = formData.Class;
//         // const GroupF = formData.Group;
//         // const HODF = formData.HOD;
//         // const SupervisorF = formData.Supervisor;
//         // const KishoriTaiF = formData.KishoriTai;
//         // const DateF = formData.Date;
//         // const TimeSlotF = formData.tSlot; 

//         // console.log(TalukaF);

//         // const filteredData = await attData.find(
//         //     {
//         //         Taluka: TalukaF,
//         //         School: SchoolF,
//         //         Class: ClassF,
//         //         Group: GroupF,
//         //         HOD: HODF,
//         //         Supervisor: SupervisorF,
//         //         KishoriTai: KishoriTaiF,
//         //         Date: DateF,
//         //         TimeSlot: TimeSlotF
//         //     },
//         //     {
//         //         _id: 0,
//         //         Attendance: 1
//         //     }
//         // );

//         // console.log(filteredData);

//         const data = await attData.find({});

//         const fields = Object.keys(data[0]._doc);
//         const opts = { fields };
//         const parser = new Parser(opts);
//         const csv = parser.parse(data);

//         const outputPath = path.join(__dirname, '../downloads');
//         fs.writeFileSync(outputPath, csv);

//         res.download(outputPath, 'attendance.csv', (err) => {
//             if (err) {
//                 console.error(err);
//             }
//             fs.unlinkSync(outputPath);  // Clean up the generated CSV file
//         });
//     } catch (err) {
//         console.error('Error fetching data from the database', err);
//         res.status(500).send('Error fetching data from the database.');
//     }
// };
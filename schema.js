const Joi = require('joi');

module.exports.kvpDataSchema = Joi.object({
    kvpData: Joi.object({
        Sname: Joi.string().required(),
        SAddress: Joi.string().required(),
        Caste: Joi.string().required(),
        SubCaste: Joi.string().required(),
        ContactNum: Joi.string().required(),
        AadharNo: Joi.string().required(),
        DOB: Joi.string().required(),
        Taluka: Joi.string().required(),
        Std: Joi.string().required(),
        School: Joi.string().required(),
        Class: Joi.string().required(),
        Group: Joi.string().required(),
        HOD: Joi.string().required(),
        Supervisor: Joi.string().required(),
        KishoriTai: Joi.string().required(),
    }).required(),
});

module.exports.attDataSchema = Joi.object({
    attData: Joi.object({
        Taluka: Joi.string().required(),
        School: Joi.string().required(),
        Class: Joi.number().required().min(1).max(10),
        Group: Joi.string().required(),
        HOD: Joi.string().required(),
        Supervisor: Joi.string().required(),
        KishoriTai: Joi.string().required(),
        Date: Joi.string().required(),
        Month: Joi.string().required(),
        Week: Joi.number().required(),
        TimeSlot: Joi.string().required(),
        totalCount:Joi.number().required().min(0),
        presentCount:Joi.number().required().min(0),
        absentCount:Joi.number().required().min(0),
        Attendance: Joi.array().items(
            Joi.object({
                name: Joi.string().required(),
                std: Joi.string().required(),
                status: Joi.string().required()
            })
        ).required()
    }).required()
});

module.exports.userDataSchemaR = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().required()
});

module.exports.userDataSchemaL = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required()
});
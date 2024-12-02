"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollSchoolAndAdmin = void 0;
const password_1 = require("../../utils/password");
const school_1 = require("../service/school");
const sms_1 = require("../service/sms");
const staff_1 = require("../service/staff");
const enrollSchoolAndAdmin = async (data) => {
    const password = (0, password_1.generatePassword)(6);
    const hashedPassword = await (0, password_1.hashPassword)(password);
    const schoolId = await (0, school_1.schoolRegistration)(data.sname, data.saddress, data.state, data.district);
    const adminId = await (0, staff_1.registerAdmin)(schoolId, data.name, data.phone, hashedPassword);
    console.log(adminId, password);
    (0, sms_1.staff_Account_Create_SMS_Service)(adminId, password, data.phone);
    return { id: adminId };
};
exports.enrollSchoolAndAdmin = enrollSchoolAndAdmin;

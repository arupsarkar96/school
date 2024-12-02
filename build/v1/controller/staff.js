"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllStaffController = exports.insertStaffController = void 0;
const password_1 = require("../../utils/password");
const sms_1 = require("../service/sms");
const staff_1 = require("../service/staff");
const insertStaffController = async (schoolId, data) => {
    const password = (0, password_1.generatePassword)(6);
    const hashedPassword = await (0, password_1.hashPassword)(password);
    data.staff_password = hashedPassword;
    const staffId = await (0, staff_1.insertStaffService)(schoolId, data);
    (0, sms_1.staff_Account_Create_SMS_Service)(staffId, password, data.staff_phone);
    console.log(staffId, password);
    return staffId;
};
exports.insertStaffController = insertStaffController;
const getAllStaffController = async (schoolId) => {
    return await (0, staff_1.getAllStaffsService)(schoolId);
};
exports.getAllStaffController = getAllStaffController;

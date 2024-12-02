"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStaffData = exports.registerAdmin = exports.getAllStaffsService = exports.insertStaffService = void 0;
const db_1 = __importDefault(require("../../db"));
const insertStaffService = async (schoolId, data) => {
    const connection = await db_1.default.getConnection();
    const sql = 'INSERT INTO staffs (`school_id`, `staff_name`, `staff_phone`, `staff_password`, `staff_gender`, `role`, `hire_date`, `salary`, `bank_name`, `account_no`, `ifsc_code`) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
    const [rows] = await connection.query(sql, [schoolId, data.staff_name, data.staff_phone, data.staff_password, data.staff_gender, data.role, data.hire_date, data.salary, data.bank_name, data.account_no, data.ifsc_code]);
    connection.release();
    const insertedId = rows.insertId; // Type assertion may be necessary
    return insertedId;
};
exports.insertStaffService = insertStaffService;
const getAllStaffsService = async (schoolId) => {
    const connection = await db_1.default.getConnection();
    const sql = "SELECT * FROM staffs WHERE school_id = ?";
    const [rows] = await connection.query(sql, [schoolId]);
    connection.release();
    return rows;
};
exports.getAllStaffsService = getAllStaffsService;
const registerAdmin = async (schoolId, name, phone, password) => {
    const connection = await db_1.default.getConnection();
    const sql = 'INSERT INTO staffs (`school_id`, `staff_name`, `staff_phone`, `staff_password`, `role`) VALUES (?,?,?,?,?)';
    const [rows] = await connection.query(sql, [schoolId, name, phone, password, 'admin']);
    connection.release();
    const insertedId = rows.insertId; // Type assertion may be necessary
    return insertedId;
};
exports.registerAdmin = registerAdmin;
const getStaffData = async (staffId) => {
    const connection = await db_1.default.getConnection();
    const sql = 'SELECT * FROM `staffs` LEFT JOIN `schools` ON `staffs`.`school_id` = `schools`.`school_id` WHERE `staffs`.`staff_id` = ?';
    const [rows] = await connection.query(sql, [staffId]);
    connection.release();
    if (rows.length === 0) {
        return null;
    }
    return rows[0];
};
exports.getStaffData = getStaffData;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_school__service = exports.fetch_school__service = exports.schoolRegistration = void 0;
const db_1 = __importDefault(require("../../db"));
const schoolRegistration = async (schoolname, schoolAddress, schoolState, schoolDistrict) => {
    const connection = await db_1.default.getConnection();
    const sql = 'INSERT INTO schools (`school_name`, `school_address`, `school_state`, `school_district`) VALUES (?,?,?,?)';
    const [rows] = await connection.query(sql, [schoolname, schoolAddress, schoolState, schoolDistrict]);
    connection.release();
    const insertedId = rows.insertId; // Type assertion may be necessary
    return insertedId;
};
exports.schoolRegistration = schoolRegistration;
const fetch_school__service = async (schoolId) => {
    const connection = await db_1.default.getConnection();
    const sql = 'SELECT * FROM `schools` WHERE `school_id` = ?';
    const [rows] = await connection.query(sql, [schoolId]);
    connection.release();
    return rows.length > 0 ? rows[0] : null;
};
exports.fetch_school__service = fetch_school__service;
const update_school__service = async (schoolId, school) => {
    const connection = await db_1.default.getConnection();
    const sql = 'UPDATE schools SET school_name = ?, school_address = ?, school_phone = ?, school_logo = ? WHERE school_id = ?';
    const [rows] = await connection.query(sql, [school.school_name, school.school_address, school.school_phone, school.school_logo, schoolId]);
    connection.release();
};
exports.update_school__service = update_school__service;

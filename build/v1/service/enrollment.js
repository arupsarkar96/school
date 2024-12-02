"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertEnrollment = exports.fetch_Enrollmets__Service = exports.update_Enrollment_Roll__Service = void 0;
const db_1 = __importDefault(require("../../db"));
const update_Enrollment_Roll__Service = async (roll, enrollment_id) => {
    const connection = await db_1.default.getConnection();
    const sql = 'UPDATE `enrollments` SET `roll_number` = ? WHERE `enrollment_id`  = ?';
    const [rows] = await connection.query(sql, [roll, enrollment_id]);
    connection.release();
};
exports.update_Enrollment_Roll__Service = update_Enrollment_Roll__Service;
const fetch_Enrollmets__Service = async (sessionId, classId) => {
    const connection = await db_1.default.getConnection();
    const sql = 'SELECT * FROM enrollments LEFT JOIN students ON enrollments.student_id = students.student_id WHERE session_id = ? AND class_id = ?';
    const [rows] = await connection.query(sql, [sessionId, classId]);
    connection.release();
    return rows;
};
exports.fetch_Enrollmets__Service = fetch_Enrollmets__Service;
const insertEnrollment = async (sessionId, classId, studentId) => {
    const connection = await db_1.default.getConnection();
    const checkSql = 'SELECT COUNT(*) AS count FROM `enrollments` WHERE `session_id` = ? AND `class_id` = ? AND `student_id` = ?';
    const [checkRows] = await connection.query(checkSql, [sessionId, classId, studentId]);
    if (checkRows[0].count === 0) {
        // If no such record exists, insert the new one
        const insertSql = 'INSERT INTO `enrollments` (`session_id`, `class_id`, `student_id`) VALUES (?,?,?)';
        await connection.query(insertSql, [sessionId, classId, studentId]);
        connection.release();
        return true;
    }
    else {
        connection.release();
        return false;
    }
};
exports.insertEnrollment = insertEnrollment;

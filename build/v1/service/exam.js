"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllExamService = exports.getActiveExamService = exports.insertExamService = exports.updateExamStatusService = exports.insertMarksData = void 0;
const db_1 = __importDefault(require("../../db"));
const insertMarksData = async (data) => {
    const connection = await db_1.default.getConnection();
    const values = data.marks.map((mark) => [
        data.sessionId,
        data.examId,
        data.classId,
        mark.uid, // `student_id`
        data.subjectId,
        parseInt(mark.fm), // `mark_full`
        parseInt(mark.mo) // `mark_obtain`
    ]);
    const sql = `INSERT INTO marks (session_id, exam_id, class_id, student_id, subject_id, mark_full, mark_obtain) VALUES ?`;
    const d = await connection.query(sql, [values]);
    console.log(d);
};
exports.insertMarksData = insertMarksData;
const updateExamStatusService = async (schoolId, examId, status) => {
    const connection = await db_1.default.getConnection();
    const sql = 'UPDATE `exams` SET exam_status = ? WHERE `school_id` = ? AND `exam_id` = ?';
    const [row] = await connection.query(sql, [status, schoolId, examId]);
    connection.release();
};
exports.updateExamStatusService = updateExamStatusService;
const insertExamService = async (schoolId, examName) => {
    const connection = await db_1.default.getConnection();
    const sql = 'INSERT INTO exams (`school_id`, `exam_name`, `exam_status`) VALUES(?,?,?)';
    const [row] = await connection.query(sql, [schoolId, examName, 0]);
    connection.release();
    const insertedId = row.insertId; // Type assertion may be necessary
    return insertedId;
};
exports.insertExamService = insertExamService;
const getActiveExamService = async (schoolId) => {
    const connection = await db_1.default.getConnection();
    const sql = 'SELECT * FROM exams WHERE school_id = ? AND `exam_status` = 1';
    const [rows] = await connection.query(sql, [schoolId]);
    connection.release();
    return rows;
};
exports.getActiveExamService = getActiveExamService;
const getAllExamService = async (schoolId) => {
    const connection = await db_1.default.getConnection();
    const sql = 'SELECT * FROM exams WHERE school_id = ?';
    const [rows] = await connection.query(sql, [schoolId]);
    connection.release();
    return rows;
};
exports.getAllExamService = getAllExamService;

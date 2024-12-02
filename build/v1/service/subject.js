"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubject = exports.addClassSubject = exports.getClassSubject = void 0;
const db_1 = __importDefault(require("../../db"));
const getClassSubject = async (schoolId, classId) => {
    const connection = await db_1.default.getConnection();
    const sql = 'SELECT * FROM `subjects` WHERE `class_id` = ?';
    const [row] = await connection.query(sql, [classId]);
    connection.release();
    return row;
};
exports.getClassSubject = getClassSubject;
const addClassSubject = async (schoolId, classId, className) => {
    const connection = await db_1.default.getConnection();
    const sql = 'INSERT INTO `subjects`(`class_id`, `subject_name`) VALUES (?,?)';
    const [row] = await connection.query(sql, [classId, className]);
    connection.release();
    const insertedId = row.insertId; // Type assertion may be necessary
    return insertedId;
};
exports.addClassSubject = addClassSubject;
const deleteSubject = async (schoolId, subjectId) => {
    const connection = await db_1.default.getConnection();
    const sql = 'DELETE FROM `subjects` WHERE `subject_id` = ?';
    const [row] = await connection.query(sql, [subjectId]);
    connection.release();
};
exports.deleteSubject = deleteSubject;

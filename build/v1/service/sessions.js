"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSession = exports.insertSession = exports.getActiveSessions = exports.getAdmissionSessions = exports.getAllSessions = void 0;
const db_1 = __importDefault(require("../../db"));
const getAllSessions = async (schoolId) => {
    const connection = await db_1.default.getConnection();
    const sql = 'SELECT * FROM `sessions` WHERE `school_id` = ? ORDER BY `end` DESC';
    const [rows] = await connection.query(sql, [schoolId]);
    connection.release();
    return rows;
};
exports.getAllSessions = getAllSessions;
const getAdmissionSessions = async (schoolId) => {
    const connection = await db_1.default.getConnection();
    const sql = 'SELECT * FROM `sessions` WHERE `school_id` = ? AND `admission` = 1 ORDER BY `session_id` DESC';
    const [rows] = await connection.query(sql, [schoolId]);
    connection.release();
    return rows;
};
exports.getAdmissionSessions = getAdmissionSessions;
const getActiveSessions = async (schoolId) => {
    const connection = await db_1.default.getConnection();
    const sql = 'SELECT * FROM `sessions` WHERE `school_id` = ? AND `status` = 1 ORDER BY `session_id` DESC';
    const [rows] = await connection.query(sql, [schoolId]);
    connection.release();
    return rows;
};
exports.getActiveSessions = getActiveSessions;
const insertSession = async (schoolId, start, end) => {
    const connection = await db_1.default.getConnection();
    const sql = 'INSERT INTO sessions(`school_id`, `start`, `end`, `admission`, `status`) VALUES (?,?,?,?,?)';
    const [rows] = await connection.query(sql, [schoolId, start, end, 1, 1]);
    connection.release();
    const insertedId = rows.insertId; // Type assertion may be necessary
    return insertedId;
};
exports.insertSession = insertSession;
const updateSession = async (schoolId, sessionId, admission, status) => {
    const connection = await db_1.default.getConnection();
    const sql = 'UPDATE sessions SET `admission` = ?, `status` = ? WHERE `session_id` = ?';
    const [rows] = await connection.query(sql, [admission, status, sessionId]);
    connection.release();
};
exports.updateSession = updateSession;

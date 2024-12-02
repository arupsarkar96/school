"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertClass = exports.getClasses = void 0;
const db_1 = __importDefault(require("../../db"));
const getClasses = async (schoolId) => {
    const connection = await db_1.default.getConnection();
    const sql = 'SELECT * FROM classes WHERE school_id = ? ORDER BY class_id ASC';
    const [rows] = await connection.query(sql, [schoolId]);
    connection.release();
    return rows;
};
exports.getClasses = getClasses;
const insertClass = async (schoolId, name) => {
    const connection = await db_1.default.getConnection();
    const sql = 'INSERT INTO classes(`school_id`, `class_name`) VALUES (?,?)';
    const [rows] = await connection.query(sql, [schoolId, name]);
    connection.release();
    const insertedId = rows.insertId; // Type assertion may be necessary
    return insertedId;
};
exports.insertClass = insertClass;

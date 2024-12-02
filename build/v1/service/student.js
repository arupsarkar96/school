"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_Student_Status__Service = exports.update_Student_Info__Service = exports.Get_Student_Info = exports.GetAllStudentsService = exports.SearchStudents = exports.FetchStudents = exports.RegisterStudent = void 0;
const db_1 = __importDefault(require("../../db"));
const RegisterStudent = async (schoolId, data, status) => {
    const connection = await db_1.default.getConnection();
    const sql = 'INSERT INTO students (`school_id`, `student_name`, `phone`, `gender`, `dob`, `address`, `parent_name`, `status`) VALUES (?,?,?,?,?,?,?,?)';
    const [row] = await connection.query(sql, [schoolId, data.student_name, data.phone, data.gender, data.dob, data.address, data.parent, status]);
    connection.release();
    const insertedId = row.insertId; // Type assertion may be necessary
    return insertedId;
};
exports.RegisterStudent = RegisterStudent;
const FetchStudents = async (schoolId, status) => {
    const connection = await db_1.default.getConnection();
    const sql = 'SELECT * FROM `students` WHERE `school_id` = ? AND `status` = ?';
    const [row] = await connection.query(sql, [schoolId, status]);
    connection.release();
    return row;
};
exports.FetchStudents = FetchStudents;
const SearchStudents = async (schoolId, query) => {
    const connection = await db_1.default.getConnection();
    const sql = 'SELECT * FROM `students` WHERE `school_id` = ? AND (`first_name` LIKE ? OR `last_name` LIKE ? OR `student_id` LIKE ?)';
    const [row] = await connection.query(sql, [schoolId, `%${query}%`, `%${query}%`, `%${query}%`]);
    connection.release();
    return row;
};
exports.SearchStudents = SearchStudents;
const GetAllStudentsService = async (schoolId) => {
    const connection = await db_1.default.getConnection();
    const sql = 'SELECT * FROM `students` WHERE `school_id` = ? ORDER by student_name ASC';
    const [row] = await connection.query(sql, [schoolId]);
    connection.release();
    return row;
};
exports.GetAllStudentsService = GetAllStudentsService;
const Get_Student_Info = async (schoolId, id) => {
    const connection = await db_1.default.getConnection();
    const sql = 'SELECT `students`.*, `school_name` FROM `students` LEFT JOIN `schools` ON `students`.`school_id` = `schools`.`school_id` WHERE `students`.`school_id` = ? AND `students`.`student_id` = ?';
    const [row] = await connection.query(sql, [schoolId, id]);
    connection.release();
    const stu = row;
    return stu.length > 0 ? stu[0] : null;
};
exports.Get_Student_Info = Get_Student_Info;
const update_Student_Info__Service = async (student_id, data) => {
    const connection = await db_1.default.getConnection();
    const sql = 'UPDATE `students` SET `student_name` = ?, dob = ?, parent_name = ?, gender = ?, phone = ?, address = ?, photo = ? WHERE `student_id` = ?';
    const [row] = await connection.query(sql, [data.student_name, data.dob.split("T")[0], data.parent_name, data.gender, data.phone, data.address, data.photo, data.student_id]);
    connection.release();
};
exports.update_Student_Info__Service = update_Student_Info__Service;
const update_Student_Status__Service = async (student_id, status) => {
    const connection = await db_1.default.getConnection();
    const sql = 'UPDATE `students` SET status = ? WHERE `student_id` = ?';
    const [row] = await connection.query(sql, [status, student_id]);
    connection.release();
};
exports.update_Student_Status__Service = update_Student_Status__Service;

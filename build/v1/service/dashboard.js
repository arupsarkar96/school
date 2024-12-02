"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetch_Dashboard__Service = void 0;
const db_1 = __importDefault(require("../../db"));
const fetch_Dashboard__Service = async (schoolId) => {
    const connection = await db_1.default.getConnection();
    const sql = 'SELECT COUNT(student_id) AS student_count FROM students WHERE school_id = ?; SELECT COUNT(staff_id) AS staff_count FROM staffs WHERE school_id = ?; SELECT SUM(transaction_amount) AS wallet_balance FROM transactions WHERE school_id = ?; SELECT COUNT(item_id) AS stock_count FROM inventories WHERE school_id = ?';
    const [rows] = await connection.query(sql, [schoolId, schoolId, schoolId, schoolId]);
    connection.release();
    return rows;
};
exports.fetch_Dashboard__Service = fetch_Dashboard__Service;

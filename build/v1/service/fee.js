"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFee = exports.getFee = exports.defaultFeeGenerate = void 0;
const db_1 = __importDefault(require("../../db"));
const defaultFeeGenerate = async (classId) => {
    const connection = await db_1.default.getConnection();
    const sql = 'INSERT INTO fees(`class_id`) VALUES (?)';
    await connection.query(sql, [classId]);
    connection.release();
};
exports.defaultFeeGenerate = defaultFeeGenerate;
const getFee = async (classId) => {
    const connection = await db_1.default.getConnection();
    try {
        const sql = 'SELECT * FROM `fees` WHERE `class_id` = ?';
        const [rows] = await connection.query(sql, [classId]);
        connection.release();
        // Since you're sure the fee will always exist, directly return the first row
        return rows[0];
    }
    catch (error) {
        console.error('Error fetching fee:', error);
        throw error; // Re-throw error to handle it at a higher level
    }
    finally {
        if (connection) {
            connection.release(); // Ensure connection is always released
        }
    }
};
exports.getFee = getFee;
const updateFee = async (fee) => {
    const connection = await db_1.default.getConnection();
    const sql = 'UPDATE `fees` SET `admission` = ?, `tuition` = ?, `cycle` = ? WHERE `fee_id` = ?';
    await connection.query(sql, [fee.admission, fee.tuition, fee.cycle, fee.fee_id]);
    connection.release();
};
exports.updateFee = updateFee;

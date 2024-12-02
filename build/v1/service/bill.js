"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchBillItems = exports.fetchBill = exports.fetchAllBills = exports.fetch_Bill_Student__Service = exports.createBill = exports.createBillItems = exports.updateBill_confirm = void 0;
const db_1 = __importDefault(require("../../db"));
const bill_1 = require("../interface/bill");
const updateBill_confirm = async (billId, transaction_id, status) => {
    const connection = await db_1.default.getConnection();
    const billItemSql = 'UPDATE `billing` SET `transaction_id` = ?, `bill_status` = ? WHERE `bill_id` = ?';
    await connection.query(billItemSql, [transaction_id, status, billId]);
    connection.release();
};
exports.updateBill_confirm = updateBill_confirm;
const createBillItems = async (items) => {
    const connection = await db_1.default.getConnection();
    const billItemSql = 'INSERT INTO `billing_details` (`bill_id`, `description`, `quantity`, `amount`) VALUES ?';
    // Perform the bulk insert
    await connection.query(billItemSql, [items]);
    connection.release();
};
exports.createBillItems = createBillItems;
const createBill = async (schoolId, studentId, staffId, amount) => {
    const connection = await db_1.default.getConnection();
    const sql = 'INSERT INTO billing (`school_id`, `student_id`, `staff_id`, `bill_date`, `bill_amount`, `bill_status`) VALUES (?,?,?,?,?,?)';
    const today = new Date().toISOString().split('T')[0];
    const [rows] = await connection.query(sql, [schoolId, studentId, staffId, today, amount, bill_1.BillStatus.UnPaid]);
    const billId = rows.insertId;
    connection.release();
    return billId;
};
exports.createBill = createBill;
const fetch_Bill_Student__Service = async (student_id) => {
    const connection = await db_1.default.getConnection();
    try {
        const sql = 'SELECT * FROM `billing` LEFT JOIN `students` ON `billing`.`student_id` = `students`.`student_id` WHERE `billing`.`student_id` = ? ORDER BY `bill_id` DESC';
        const [rows] = await connection.query(sql, [student_id]);
        connection.release();
        // Return the rows as Bill[]
        return rows;
    }
    catch (error) {
        console.error('Error fetching bill items:', error);
        return []; // Return an empty array in case of error
    }
    finally {
        connection.release(); // Make sure the connection is released in case of an error
    }
};
exports.fetch_Bill_Student__Service = fetch_Bill_Student__Service;
const fetchAllBills = async (schoolId) => {
    const connection = await db_1.default.getConnection();
    try {
        const sql = 'SELECT * FROM `billing` LEFT JOIN `students` ON `billing`.`student_id` = `students`.`student_id` WHERE `billing`.`school_id` = ? ORDER BY `bill_id` DESC';
        const [rows] = await connection.query(sql, [schoolId]);
        connection.release();
        // Return the rows as Bill[]
        return rows;
    }
    catch (error) {
        console.error('Error fetching bill items:', error);
        return []; // Return an empty array in case of error
    }
    finally {
        connection.release(); // Make sure the connection is released in case of an error
    }
};
exports.fetchAllBills = fetchAllBills;
const fetchBill = async (billId, schoolId) => {
    const connection = await db_1.default.getConnection();
    try {
        const sql = 'SELECT * FROM `billing` LEFT JOIN `schools` ON `billing`.`school_id` = `schools`.`school_id` LEFT JOIN `students` ON `billing`.`student_id` = `students`.`student_id` WHERE `billing`.`bill_id` = ? AND `billing`.`school_id` = ?';
        const [rows] = await connection.query(sql, [billId, schoolId]);
        connection.release();
        // If rows exist, return the first one, otherwise return null
        return rows.length > 0 ? rows[0] : null;
    }
    catch (error) {
        console.error('Error fetching bill:', error);
        return null;
    }
    finally {
        connection.release(); // Make sure the connection is released in case of an error
    }
};
exports.fetchBill = fetchBill;
const fetchBillItems = async (billId) => {
    const connection = await db_1.default.getConnection();
    try {
        const sql = 'SELECT * FROM `billing_details` WHERE `bill_id` = ?';
        const [rows] = await connection.query(sql, [billId]);
        connection.release();
        // Return the rows as BillItem[]
        return rows;
    }
    catch (error) {
        console.error('Error fetching bill items:', error);
        return []; // Return an empty array in case of error
    }
    finally {
        connection.release(); // Make sure the connection is released in case of an error
    }
};
exports.fetchBillItems = fetchBillItems;

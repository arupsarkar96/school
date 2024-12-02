import { RowDataPacket } from "mysql2/promise"
import pool from "../../db"
import { BillItem, BillStatus, BillWithStudent, BillWithStudentAndSchool, PreBillItem } from "../interface/bill"




export const updateBill_confirm = async (billId: number, transaction_id: string, status: string) => {
    const connection = await pool.getConnection();
    const billItemSql = 'UPDATE `billing` SET `transaction_id` = ?, `bill_status` = ? WHERE `bill_id` = ?';
    await connection.query(billItemSql, [transaction_id, status, billId]);
    connection.release();
}

export const createBillItems = async (items: PreBillItem[]) => {
    const connection = await pool.getConnection();
    const billItemSql = 'INSERT INTO `billing_details` (`bill_id`, `description`, `quantity`, `amount`) VALUES ?';
    // Perform the bulk insert
    await connection.query(billItemSql, [items]);
    connection.release();
}

export const createBill = async (schoolId: number, studentId: number, staffId: number, amount: number): Promise<number> => {
    const connection = await pool.getConnection();
    const sql = 'INSERT INTO billing (`school_id`, `student_id`, `staff_id`, `bill_date`, `bill_amount`, `bill_status`) VALUES (?,?,?,?,?,?)';
    const today = new Date().toISOString().split('T')[0];
    const [rows] = await connection.query(sql, [schoolId, studentId, staffId, today, amount, BillStatus.UnPaid]);
    const billId: number = (rows as any).insertId;
    connection.release();
    return billId;
}

export const fetch_Bill_Student__Service = async (student_id: number): Promise<BillWithStudent[]> => {
    const connection = await pool.getConnection();
    try {
        const sql = 'SELECT * FROM `billing` LEFT JOIN `students` ON `billing`.`student_id` = `students`.`student_id` WHERE `billing`.`student_id` = ? ORDER BY `bill_id` DESC';
        const [rows]: [RowDataPacket[], unknown] = await connection.query(sql, [student_id]);
        connection.release();
        // Return the rows as Bill[]
        return rows as BillWithStudent[];
    } catch (error) {
        console.error('Error fetching bill items:', error);
        return []; // Return an empty array in case of error
    } finally {
        connection.release(); // Make sure the connection is released in case of an error
    }
}

export const fetchAllBills = async (schoolId: number): Promise<BillWithStudent[]> => {
    const connection = await pool.getConnection();
    try {
        const sql = 'SELECT * FROM `billing` LEFT JOIN `students` ON `billing`.`student_id` = `students`.`student_id` WHERE `billing`.`school_id` = ? ORDER BY `bill_id` DESC';
        const [rows]: [RowDataPacket[], unknown] = await connection.query(sql, [schoolId]);
        connection.release();
        // Return the rows as Bill[]
        return rows as BillWithStudent[];
    } catch (error) {
        console.error('Error fetching bill items:', error);
        return []; // Return an empty array in case of error
    } finally {
        connection.release(); // Make sure the connection is released in case of an error
    }
}

export const fetchBill = async (billId: number, schoolId: number): Promise<BillWithStudentAndSchool | null> => {
    const connection = await pool.getConnection();
    try {
        const sql = 'SELECT * FROM `billing` LEFT JOIN `schools` ON `billing`.`school_id` = `schools`.`school_id` LEFT JOIN `students` ON `billing`.`student_id` = `students`.`student_id` WHERE `billing`.`bill_id` = ? AND `billing`.`school_id` = ?';
        const [rows]: [RowDataPacket[], unknown] = await connection.query(sql, [billId, schoolId]);
        connection.release();
        // If rows exist, return the first one, otherwise return null
        return rows.length > 0 ? (rows[0] as BillWithStudentAndSchool) : null;
    } catch (error) {
        console.error('Error fetching bill:', error);
        return null;
    } finally {
        connection.release(); // Make sure the connection is released in case of an error
    }
};

export const fetchBillItems = async (billId: number): Promise<BillItem[]> => {
    const connection = await pool.getConnection();
    try {
        const sql = 'SELECT * FROM `billing_details` WHERE `bill_id` = ?';
        const [rows]: [RowDataPacket[], unknown] = await connection.query(sql, [billId]);
        connection.release();
        // Return the rows as BillItem[]
        return rows as BillItem[];
    } catch (error) {
        console.error('Error fetching bill items:', error);
        return []; // Return an empty array in case of error
    } finally {
        connection.release(); // Make sure the connection is released in case of an error
    }
};

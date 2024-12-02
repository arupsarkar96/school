import { RowDataPacket } from "mysql2/promise"
import pool from "../../db"

export const fetch_Dashboard__Service = async (schoolId: number): Promise<any> => {
    const connection = await pool.getConnection();
    const sql = 'SELECT COUNT(student_id) AS student_count FROM students WHERE school_id = ?; SELECT COUNT(staff_id) AS staff_count FROM staffs WHERE school_id = ?; SELECT SUM(transaction_amount) AS wallet_balance FROM transactions WHERE school_id = ?; SELECT COUNT(item_id) AS stock_count FROM inventories WHERE school_id = ?';

    const [rows] = await connection.query(sql, [schoolId, schoolId, schoolId, schoolId]);
    connection.release();
    return rows
}
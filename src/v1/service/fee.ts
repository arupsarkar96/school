
import { RowDataPacket } from "mysql2/promise"
import pool from "../../db"
import { Fee } from "../interface/fee";

export const defaultFeeGenerate = async (classId: number) => {
    const connection = await pool.getConnection();
    const sql = 'INSERT INTO fees(`class_id`) VALUES (?)'
    await connection.query(sql, [classId])
    connection.release();
}

export const getFee = async (classId: number): Promise<Fee> => {
    const connection = await pool.getConnection();
    try {
        const sql = 'SELECT * FROM `fees` WHERE `class_id` = ?';
        const [rows]: [RowDataPacket[], unknown] = await connection.query(sql, [classId]);
        connection.release();

        // Since you're sure the fee will always exist, directly return the first row
        return rows[0] as Fee;
    } catch (error) {
        console.error('Error fetching fee:', error);
        throw error;  // Re-throw error to handle it at a higher level
    } finally {
        if (connection) {
            connection.release();  // Ensure connection is always released
        }
    }
}

export const updateFee = async (fee: Fee) => {
    const connection = await pool.getConnection();
    const sql = 'UPDATE `fees` SET `admission` = ?, `tuition` = ?, `cycle` = ? WHERE `fee_id` = ?'
    await connection.query(sql, [fee.admission, fee.tuition, fee.cycle, fee.fee_id])
    connection.release();
}
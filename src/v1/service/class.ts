import { RowDataPacket } from "mysql2/promise"
import pool from "../../db"
import { Class } from "../interface/class";

export const getClasses = async (schoolId: number): Promise<Class[]> => {
    const connection = await pool.getConnection();
    const sql = 'SELECT * FROM classes WHERE school_id = ? ORDER BY class_id ASC';
    const [rows] = await connection.query(sql, [schoolId]);
    connection.release();
    return rows as Class[]
}

export const insertClass = async (schoolId: number, name: string): Promise<number> => {
    const connection = await pool.getConnection();
    const sql = 'INSERT INTO classes(`school_id`, `class_name`) VALUES (?,?)';
    const [rows] = await connection.query(sql, [schoolId, name]);
    connection.release();
    const insertedId = (rows as any).insertId; // Type assertion may be necessary
    return insertedId
}
import { RowDataPacket } from "mysql2/promise"
import pool from "../../db"
import { EnrollmentWithStudent } from "../interface/enrollment";


export const update_Enrollment_Roll__Service = async (roll: number, enrollment_id: number) => {
    const connection = await pool.getConnection();
    const sql = 'UPDATE `enrollments` SET `roll_number` = ? WHERE `enrollment_id`  = ?';
    const [rows] = await connection.query(sql, [roll, enrollment_id]);
    connection.release();
}

export const fetch_Enrollmets__Service = async (sessionId: number, classId: number): Promise<EnrollmentWithStudent[]> => {
    const connection = await pool.getConnection();
    const sql = 'SELECT * FROM enrollments LEFT JOIN students ON enrollments.student_id = students.student_id WHERE session_id = ? AND class_id = ?';
    const [rows] = await connection.query(sql, [sessionId, classId]);
    connection.release();
    return rows as any
}

export const insertEnrollment = async (sessionId: number, classId: number, studentId: number): Promise<boolean> => {
    const connection = await pool.getConnection();
    const checkSql = 'SELECT COUNT(*) AS count FROM `enrollments` WHERE `session_id` = ? AND `class_id` = ? AND `student_id` = ?';
    const [checkRows]: [RowDataPacket[], unknown] = await connection.query(checkSql, [sessionId, classId, studentId]);

    if (checkRows[0].count === 0) {
        // If no such record exists, insert the new one
        const insertSql = 'INSERT INTO `enrollments` (`session_id`, `class_id`, `student_id`) VALUES (?,?,?)';
        await connection.query(insertSql, [sessionId, classId, studentId]);
        connection.release();
        return true
    } else {
        connection.release();
        return false
    }
}
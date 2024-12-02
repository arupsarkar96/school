import { RowDataPacket } from "mysql2/promise"
import pool from "../../db"
import { Subject } from "../interface/subject"

export const getClassSubject = async (schoolId: number, classId: number): Promise<Subject[]> => {
    const connection = await pool.getConnection()
    const sql = 'SELECT * FROM `subjects` WHERE `class_id` = ?'
    const [row] = await connection.query(sql, [classId])
    connection.release()
    return row as Subject[]
}

export const addClassSubject = async (schoolId: number, classId: number, className: string): Promise<number> => {
    const connection = await pool.getConnection()
    const sql = 'INSERT INTO `subjects`(`class_id`, `subject_name`) VALUES (?,?)'
    const [row] = await connection.query(sql, [classId, className])
    connection.release()
    const insertedId: number = (row as any).insertId; // Type assertion may be necessary
    return insertedId
}

export const deleteSubject = async (schoolId: number, subjectId: number) => {
    const connection = await pool.getConnection()
    const sql = 'DELETE FROM `subjects` WHERE `subject_id` = ?'
    const [row] = await connection.query(sql, [subjectId])
    connection.release()
}
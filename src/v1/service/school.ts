import { RowDataPacket } from "mysql2/promise";
import pool from "../../db"
import { School } from "../interface/school"


export const schoolRegistration = async (schoolname: string, schoolAddress: string, schoolState: string, schoolDistrict: string): Promise<number> => {
    const connection = await pool.getConnection()
    const sql = 'INSERT INTO schools (`school_name`, `school_address`, `school_state`, `school_district`) VALUES (?,?,?,?)'
    const [rows] = await connection.query(sql, [schoolname, schoolAddress, schoolState, schoolDistrict])
    connection.release()
    const insertedId = (rows as any).insertId; // Type assertion may be necessary
    return insertedId
}

export const fetch_school__service = async (schoolId: number): Promise<School | null> => {
    const connection = await pool.getConnection()
    const sql = 'SELECT * FROM `schools` WHERE `school_id` = ?'
    const [rows]: [RowDataPacket[], unknown] = await connection.query(sql, [schoolId])
    connection.release()
    return rows.length > 0 ? rows[0] as School : null
}

export const update_school__service = async (schoolId: number, school: School) => {
    const connection = await pool.getConnection()
    const sql = 'UPDATE schools SET school_name = ?, school_address = ?, school_phone = ?, school_logo = ? WHERE school_id = ?'
    const [rows] = await connection.query(sql, [school.school_name, school.school_address, school.school_phone, school.school_logo, schoolId])
    connection.release()
}
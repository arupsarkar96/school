import { FieldPacket, RowDataPacket } from "mysql2"
import database from "../config/database"
import { create_fees__service } from "./fees-service"


export interface Course {
    course_id: number,
    school_id: string,
    course_name: string
}

export const create_class__service = async (schoolId: string, className: string): Promise<boolean> => {

    const sql = "INSERT INTO `Courses` (`school_id`, `course_name`) VALUES (?,?)"
    try {
        const [rows] = await database.query(sql, [schoolId, className])
        const classId = (rows as any).insertId
        create_fees__service(classId)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

export const fetch_class__service = async (classId: number): Promise<Course | null> => {
    const sql = "SELECT *  FROM `Courses` WHERE `course_id` = ?"

    try {
        const [rows]: [RowDataPacket[], FieldPacket[]] = await database.query(sql, [classId])
        return rows.length > 0 ? rows[0] as Course : null
    } catch (error) {
        console.error(error)
        return null
    }
}

export const fetch_classes__service = async (schoolId: string): Promise<Course[]> => {
    const sql = "SELECT *  FROM `Courses` WHERE `school_id` = ?"

    try {
        const [rows]: [RowDataPacket[], FieldPacket[]] = await database.query(sql, [schoolId])
        return rows as Course[]
    } catch (error) {
        console.error(error)
        return []
    }
}

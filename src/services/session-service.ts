import { FieldPacket, RowDataPacket } from "mysql2";
import database from "../config/database";


export interface Session {
    session_id: number,
    school_id: string,
    session_name: string,
    start: string,
    end: string,
    status: string
}


export const create_session__service = async (schoolId: string, startDate: string, endDate: string): Promise<Session | null> => {

    const dateStart = new Date(startDate);
    const dateEnd = new Date(endDate)
    const name = `${dateStart.getFullYear()}-${dateEnd.getFullYear()}`

    const sql = "UPDATE `Sessions` SET `status` = 'CLOSED' WHERE school_id = ?; INSERT INTO `Sessions` (`school_id`, `session_name`, `start`, `end`, `status`) VALUES (?,?,?,?,?)"

    try {
        const [rows] = await database.query(sql, [schoolId, schoolId, name, startDate, endDate, 'ACTIVE'])
        const id = (rows as any).insertId;
        return {
            session_id: id,
            school_id: schoolId,
            session_name: name,
            start: startDate,
            end: endDate,
            status: "ACTIVE"
        }
    } catch (error) {
        console.error(error)
        return null
    }
}

export const fetch_active_session__service = async (schoolId: string): Promise<Session | null> => {

    const sql = "SELECT * FROM `Sessions` WHERE `school_id` = ? AND `status` = 'ACTIVE'"

    try {
        const [rows]: [RowDataPacket[], FieldPacket[]] = await database.query(sql, [schoolId])
        return rows.length > 0 ? rows[0] as Session : null
    } catch (error) {
        console.error(error)
        return null
    }
}

export const fetch_session__service = async (sessionId: string): Promise<Session | null> => {

    const sql = "SELECT * FROM `Sessions` WHERE `session_id` = ?"

    try {
        const [rows]: [RowDataPacket[], FieldPacket[]] = await database.query(sql, [sessionId])
        return rows.length > 0 ? rows[0] as Session : null
    } catch (error) {
        console.error(error)
        return null
    }
}

export const fetch_all_session__service = async (schoolId: string): Promise<Session[]> => {

    const sql = "SELECT * FROM `Sessions` WHERE `school_id` = ? ORDER BY `session_id` DESC"

    try {
        const [rows]: [RowDataPacket[], FieldPacket[]] = await database.query(sql, [schoolId])
        return rows as Session[]
    } catch (error) {
        console.error(error)
        return []
    }
}
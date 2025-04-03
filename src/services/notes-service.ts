import database from "../config/database"
import { fetch_active_session__service, fetch_session__service } from "./session-service"

export interface Note {
    content: string,
    created_at: string,
    subject_name: string
}

export const fetch_notes__service = async (courseId: number, sessionId: number, page: number): Promise<Note[]> => {
    const offset = page * 10
    const sql = "SELECT * FROM Notes LEFT JOIN Subjects ON Notes.subject_id = Subjects.subject_id WHERE Notes.course_id = ? AND Notes.session_id = ? ORDER BY note_id DESC LIMIT 10 OFFSET ?"

    try {
        const [rows] = await database.query(sql, [courseId, sessionId, offset])
        return rows as Note[]
    } catch (error) {
        console.error(error)
        return []
    }
}

export const fetch_teacher_notes__service = async (userId: string, page: number): Promise<Note[]> => {
    const offset = page * 10
    const sql = "SELECT * FROM `Notes` LEFT JOIN `Subjects` ON `Notes`.`subject_id` = `Subjects`.`subject_id` WHERE `Notes`.`staff_id` = ? ORDER BY Notes.note_id DESC LIMIT 10 OFFSET ?"

    try {
        const [rows] = await database.query(sql, [userId, offset])
        return rows as Note[]
    } catch (error) {
        console.error(error)
        return []
    }
}

export const create_teacher_notes__service = async (schoolId: string, classId: string, subject: string, userId: string, content: string): Promise<boolean> => {
    const currentSession = await fetch_active_session__service(schoolId)

    const sql = "INSERT INTO `Notes` (`school_id`, `session_id`, `course_id`, `subject_id`, `staff_id`, `content`) VALUES (?,?,?,?,?,?)"

    try {
        const [rows] = await database.query(sql, [schoolId, currentSession?.session_id, classId, subject, userId, content])
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

export const delete_teacher_notes__service = async (schoolId: string, userId: string, noteId: number): Promise<boolean> => {
    const sql = "DELETE FROM `Notes` WHERE `school_id` = ? AND `staff_id` = ? AND `note_id` = ?"
    try {
        const [rows] = await database.query(sql, [schoolId, userId, noteId])
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

export const edit_teacher_notes__service = async (content: string, schoolId: string, userId: string, noteId: number): Promise<boolean> => {
    const sql = "UPDATE `Notes` SET `content` = ? WHERE `school_id` = ? AND `staff_id` = ? AND `note_id` = ?"
    try {
        const [rows] = await database.query(sql, [content, schoolId, userId, noteId])
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}
import database from "../config/database"


export interface Subject {
    subject_id: number,
    course_id: number,
    subject_name: string
}

export const fetch_subject__service = async (classId: number): Promise<Subject[]> => {
    try {
        const sql = 'SELECT * FROM `Subjects` WHERE `course_id` = ?'
        const [row] = await database.query(sql, [classId])
        return row as Subject[]
    } catch (error) {
        console.error(error)
        return []
    }
}

export const delete_subject__service = async (classId: number, subjectId: number) => {
    try {
        const sql = 'DELETE FROM `Subjects` WHERE `course_id` = ? AND `subject_id` = ?'
        const [row] = await database.query(sql, [classId, subjectId])
    } catch (error) {
        console.error(error)
    }
}


export const create_subject__service = async (classId: number, className: string) => {
    try {
        const sql = 'INSERT INTO `Subjects`(`course_id`, `subject_name`) VALUES (?,?)'
        const [row] = await database.query(sql, [classId, className])
    } catch (error) {
        console.error(error)
    }
}
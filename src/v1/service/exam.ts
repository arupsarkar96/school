import pool from "../../db";
import { Exam, ExamData } from "../interface/exam";


export const insertMarksData = async (data: ExamData) => {
    const connection = await pool.getConnection()

    const values = data.marks.map((mark) => [
        data.sessionId,
        data.examId,
        data.classId,
        mark.uid, // `student_id`
        data.subjectId,
        parseInt(mark.fm), // `mark_full`
        parseInt(mark.mo)  // `mark_obtain`
    ]);

    const sql = `INSERT INTO marks (session_id, exam_id, class_id, student_id, subject_id, mark_full, mark_obtain) VALUES ?`;
    const d = await connection.query(sql, [values]);
    console.log(d)
}

export const updateExamStatusService = async (schoolId: number, examId: string | number, status: boolean) => {
    const connection = await pool.getConnection()
    const sql = 'UPDATE `exams` SET exam_status = ? WHERE `school_id` = ? AND `exam_id` = ?'
    const [row] = await connection.query(sql, [status, schoolId, examId])
    connection.release()
}

export const insertExamService = async (schoolId: number, examName: string): Promise<number> => {
    const connection = await pool.getConnection()
    const sql = 'INSERT INTO exams (`school_id`, `exam_name`, `exam_status`) VALUES(?,?,?)'
    const [row] = await connection.query(sql, [schoolId, examName, 0])
    connection.release()
    const insertedId = (row as any).insertId; // Type assertion may be necessary
    return insertedId
}


export const getActiveExamService = async (schoolId: number): Promise<Exam[]> => {
    const connection = await pool.getConnection()
    const sql = 'SELECT * FROM exams WHERE school_id = ? AND `exam_status` = 1'
    const [rows] = await connection.query(sql, [schoolId])
    connection.release()
    return rows as Exam[]
}


export const getAllExamService = async (schoolId: number): Promise<Exam[]> => {
    const connection = await pool.getConnection()
    const sql = 'SELECT * FROM exams WHERE school_id = ?'
    const [rows] = await connection.query(sql, [schoolId])
    connection.release()
    return rows as Exam[]
}
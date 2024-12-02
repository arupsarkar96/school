import pool from "../../db"



export const getResultsService = async (session: string, classId: string, examId: string) => {
    const connection = await pool.getConnection();
    const sql = `SELECT 
    marks.student_id, 
    students.student_name, 
    students.photo, 
    SUM(marks.mark_full) AS total_full_marks, 
    SUM(marks.mark_obtain) AS total_obtained_marks
FROM 
    marks
LEFT JOIN 
    students ON marks.student_id = students.student_id
WHERE 
    marks.session_id = ? 
    AND marks.class_id = ? 
    AND marks.exam_id = ?
GROUP BY 
    marks.student_id;
`
    const [rows] = await connection.query(sql, [session, classId, examId])
    return rows
}
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResultsService = void 0;
const db_1 = __importDefault(require("../../db"));
const getResultsService = async (session, classId, examId) => {
    const connection = await db_1.default.getConnection();
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
`;
    const [rows] = await connection.query(sql, [session, classId, examId]);
    return rows;
};
exports.getResultsService = getResultsService;

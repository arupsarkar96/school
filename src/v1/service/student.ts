import { RowDataPacket } from "mysql2/promise"
import pool from "../../db"
import { EnrollStudent, Student, StudentStatus } from "../interface/student"

export const RegisterStudent = async (schoolId: number, data: EnrollStudent, status: StudentStatus): Promise<number> => {

    const connection = await pool.getConnection()
    const sql = 'INSERT INTO students (`school_id`, `student_name`, `phone`, `gender`, `dob`, `address`, `parent_name`, `status`) VALUES (?,?,?,?,?,?,?,?)'
    const [row] = await connection.query(sql, [schoolId, data.student_name, data.phone, data.gender, data.dob, data.address, data.parent, status])
    connection.release()
    const insertedId = (row as any).insertId; // Type assertion may be necessary
    return insertedId
}

export const FetchStudents = async (schoolId: number, status: StudentStatus): Promise<Student[]> => {

    const connection = await pool.getConnection()
    const sql = 'SELECT * FROM `students` WHERE `school_id` = ? AND `status` = ?'
    const [row] = await connection.query(sql, [schoolId, status])
    connection.release()
    return row as Student[]
}

export const SearchStudents = async (schoolId: number, query: string): Promise<Student[]> => {
    const connection = await pool.getConnection()
    const sql = 'SELECT * FROM `students` WHERE `school_id` = ? AND (`first_name` LIKE ? OR `last_name` LIKE ? OR `student_id` LIKE ?)'
    const [row] = await connection.query(sql, [schoolId, `%${query}%`, `%${query}%`, `%${query}%`])
    connection.release()
    return row as Student[]
}

export const GetAllStudentsService = async (schoolId: number): Promise<Student[]> => {
    const connection = await pool.getConnection()
    const sql = 'SELECT * FROM `students` WHERE `school_id` = ? ORDER by student_name ASC'
    const [row] = await connection.query(sql, [schoolId])
    connection.release()
    return row as Student[]
}

export const Get_Student_Info = async (schoolId: number, id: number): Promise<Student | null> => {
    const connection = await pool.getConnection()
    const sql = 'SELECT `students`.*, `school_name` FROM `students` LEFT JOIN `schools` ON `students`.`school_id` = `schools`.`school_id` WHERE `students`.`school_id` = ? AND `students`.`student_id` = ?'
    const [row] = await connection.query(sql, [schoolId, id])
    connection.release()
    const stu = row as Student[]
    return stu.length > 0 ? stu[0] : null
}


export const update_Student_Info__Service = async (student_id: number, data: Student) => {
    const connection = await pool.getConnection()
    const sql = 'UPDATE `students` SET `student_name` = ?, dob = ?, parent_name = ?, gender = ?, phone = ?, address = ?, photo = ? WHERE `student_id` = ?'
    const [row] = await connection.query(sql, [data.student_name, data.dob.split("T")[0], data.parent_name, data.gender, data.phone, data.address, data.photo, data.student_id])
    connection.release()
}

export const update_Student_Status__Service = async (student_id: number, status: StudentStatus) => {
    const connection = await pool.getConnection()
    const sql = 'UPDATE `students` SET status = ? WHERE `student_id` = ?'
    const [row] = await connection.query(sql, [status, student_id])
    connection.release()
}
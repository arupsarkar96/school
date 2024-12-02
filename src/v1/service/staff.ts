
import { RowDataPacket } from "mysql2/promise"
import pool from "../../db"
import { Staff, StaffWithSchool } from "../interface/staff"



export const insertStaffService = async (schoolId: number, data: Staff): Promise<number> => {
    const connection = await pool.getConnection()
    const sql = 'INSERT INTO staffs (`school_id`, `staff_name`, `staff_phone`, `staff_password`, `staff_gender`, `role`, `hire_date`, `salary`, `bank_name`, `account_no`, `ifsc_code`) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
    const [rows] = await connection.query(sql, [schoolId, data.staff_name, data.staff_phone, data.staff_password, data.staff_gender, data.role, data.hire_date, data.salary, data.bank_name, data.account_no, data.ifsc_code])
    connection.release()
    const insertedId = (rows as any).insertId; // Type assertion may be necessary
    return insertedId
}

export const getAllStaffsService = async (schoolId: number): Promise<Staff[]> => {
    const connection = await pool.getConnection()
    const sql = "SELECT * FROM staffs WHERE school_id = ?"
    const [rows] = await connection.query(sql, [schoolId])
    connection.release()
    return rows as Staff[]
}

export const registerAdmin = async (schoolId: number, name: string, phone: string, password: string): Promise<number> => {
    const connection = await pool.getConnection()
    const sql = 'INSERT INTO staffs (`school_id`, `staff_name`, `staff_phone`, `staff_password`, `role`) VALUES (?,?,?,?,?)'
    const [rows] = await connection.query(sql, [schoolId, name, phone, password, 'admin'])
    connection.release()
    const insertedId = (rows as any).insertId; // Type assertion may be necessary
    return insertedId
}

export const getStaffData = async (staffId: string | number): Promise<StaffWithSchool | null> => {
    const connection = await pool.getConnection()
    const sql = 'SELECT * FROM `staffs` LEFT JOIN `schools` ON `staffs`.`school_id` = `schools`.`school_id` WHERE `staffs`.`staff_id` = ?'
    const [rows]: [RowDataPacket[], unknown] = await connection.query(sql, [staffId])
    connection.release()

    if (rows.length === 0) {
        return null;
    }
    return rows[0] as StaffWithSchool;
}
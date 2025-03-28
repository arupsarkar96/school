import { FieldPacket, RowDataPacket } from "mysql2"
import database from "../config/database"
import { generatePassword, hashPassword } from "../utils/password"
import { account_Create_SMS_Service } from "./sms-service"


export interface Staff {
    staff_id: string,
    school_id: string,
    staff_name: string,
    staff_phone: string,
    staff_password: string,
    staff_image: string,
    staff_gender: string,
    role: string
}


export const create_staff__service = async (schoolId: string, name: string, phone: string, gender: string, role: string): Promise<string | null> => {
    const studentId = await generateStaffId(schoolId)
    const password = generatePassword(6)
    const hashedPassword = await hashPassword(password)
    const photo = `https://robohash.org/${name}?set=set1&size=200x200&format=png`

    try {
        const sql = 'INSERT INTO Staffs (`staff_id`, `school_id`, `staff_name`, `staff_phone`, `staff_password`, `staff_image`, `staff_gender`, `role`) VALUES (?,?,?,?,?,?,?,?)'
        const [row] = await database.query(sql, [studentId, schoolId, name, phone, hashedPassword, photo, gender, role])
        account_Create_SMS_Service(studentId, password, phone)
        return `ID: ${studentId} | Password: ${password}`
    } catch (error) {
        console.error(error)
        return null
    }
}

export const fetch_staffs__service = async (schoolId: string, page: number): Promise<Staff[]> => {
    const offset = page * 10

    const sql = "SELECT * FROM `Staffs` WHERE `school_id` = ? ORDER BY staff_name ASC LIMIT 10 OFFSET ?"
    try {
        const [rows]: [RowDataPacket[], FieldPacket[]] = await database.query(sql, [schoolId, offset])
        return rows as Staff[]
    } catch (error) {
        return []
    }
}


export const fetch_staff__service = async (staffId: string): Promise<Staff | null> => {

    const sql = "SELECT * FROM `Staffs` WHERE `staff_id` = ?"

    try {
        const [rows]: [RowDataPacket[], FieldPacket[]] = await database.query(sql, [staffId])
        return rows.length > 0 ? rows[0] as Staff : null
    } catch (error) {
        return null
    }
}

const generateStaffId = async (schoolId: string): Promise<string> => {
    const today = new Date();
    const year = today.getFullYear();
    const yearPrefix = year.toString().slice(2);

    const [rows]: [RowDataPacket[], FieldPacket[]] = await database.query(`SELECT last_sequence FROM sequence_tracker WHERE school_id = ? AND year = ? AND role = ?`, [schoolId, year, "SF"]);

    let lastSequence = 0;

    if (rows.length === 0) {
        // If no sequence, initialize with 23001 for this school and year
        lastSequence = 1;  // This will become 23001 for the first user
        await database.query(`INSERT INTO sequence_tracker (school_id, year, last_sequence, role) VALUES (?,?,?,?)`, [schoolId, year, lastSequence, "SF"]);
    } else {
        // Increment the last sequence number
        lastSequence = rows[0].last_sequence + 1;
        await database.query(
            `UPDATE sequence_tracker SET last_sequence = ? WHERE school_id = ? AND year = ? AND role = ?`,
            [lastSequence, schoolId, year, "SF"]
        );
    }
    return `${schoolId}${lastSequence.toString().padStart(3, '0')}`
}
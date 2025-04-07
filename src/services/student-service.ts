import { FieldPacket, RowDataPacket } from "mysql2"
import database from "../config/database"
import { generatePassword, hashPassword } from "../utils/password"
import { account_Create_SMS_Service } from "./sms-service"



export interface Student {
    student_id: string,
    school_id: string,
    student_name: string,
    password: string,
    phone: string,
    gender: string,
    birth_date: string,
    address: string,
    photo: string | null,
    parent_name: string,
    status: string
}


export const create_student__service = async (schoolId: string, name: string, phone: string, gender: string, birth_date: string, address: string, photo: string, parent_name: string): Promise<string | null> => {

    const studentId = await generateStudentId(schoolId)
    const password = generatePassword(6)
    const hashedPassword = await hashPassword(password)
    const photoGen = `https://robohash.org/${name}?set=set1&size=200x200&format=png`

    try {
        const sql = 'INSERT INTO Students (`student_id`, `school_id`, `student_name`, `password`, `phone`, `gender`, `birth_date`, `address`, `photo`, `parent_name`) VALUES (?,?,?,?,?,?,?,?,?,?)'
        const [row] = await database.query(sql, [studentId, schoolId, name, hashedPassword, phone, gender, birth_date, address, photoGen, parent_name])
        account_Create_SMS_Service(studentId, password, phone)
        console.log(password)
        return `ID: ${studentId} | Password: ${password}`
    } catch (error) {
        console.error(error)
        return null
    }

}

export const fetch_draft_students__service = async (schoolId: string, page: number): Promise<Student[]> => {
    const offset = page * 10

    const sql = "SELECT * FROM `Students` WHERE `school_id` = ? AND status = 'draft' ORDER BY `student_id` DESC LIMIT 10 OFFSET ?"

    try {
        const [rows]: [RowDataPacket[], FieldPacket[]] = await database.query(sql, [schoolId, offset])
        return rows as Student[]
    } catch (error) {
        console.error(error)
        return []
    }

}


export const fetch_student__service = async (studentId: string): Promise<Student | null> => {

    const sql = "SELECT * FROM `Students` WHERE `student_id` = ?"

    try {
        const [rows]: [RowDataPacket[], FieldPacket[]] = await database.query(sql, [studentId])
        return rows.length > 0 ? rows[0] as Student : null
    } catch (error) {
        console.error(error)
        return null
    }

}


const generateStudentId = async (schoolId: string): Promise<string> => {
    const today = new Date();
    const year = today.getFullYear();
    const yearPrefix = year.toString().slice(2);

    const [rows]: [RowDataPacket[], FieldPacket[]] = await database.query(`SELECT last_sequence FROM sequence_tracker WHERE school_id = ? AND year = ? AND role = ?`, [schoolId, year, "ST"]);

    let lastSequence = 0;

    if (rows.length === 0) {
        // If no sequence, initialize with 23001 for this school and year
        lastSequence = 1;  // This will become 23001 for the first user
        await database.query(`INSERT INTO sequence_tracker (school_id, year, last_sequence, role) VALUES (?,?,?,?)`, [schoolId, year, lastSequence, "ST"]);
    } else {
        // Increment the last sequence number
        lastSequence = rows[0].last_sequence + 1;
        await database.query(
            `UPDATE sequence_tracker SET last_sequence = ? WHERE school_id = ? AND year = ? AND role = ?`,
            [lastSequence, schoolId, year, "ST"]
        );
    }
    return `${schoolId}${yearPrefix}${lastSequence.toString().padStart(3, '0')}`;
}
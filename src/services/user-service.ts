import { FieldPacket, QueryResult, RowDataPacket } from "mysql2"
import { account_Create_SMS_Service } from "./sms-service"
import database from "../config/database"
import { generatePassword, hashPassword } from "../utils/password"


export enum UserType {
    STUDENT, TEACHER, ADMIN, STAFF, DRIVER
}


export const user_create__service = async (schoolId: string, name: string, email: string, phone: string, type: UserType, gender: string, birth_date: string, photo: string): Promise<string | null> => {

    const uid = await generateUserId(schoolId, type)
    const password = generatePassword(6)
    const hashedPassword = await hashPassword(password)

    try {
        const sql = 'INSERT INTO `users` (`uid`, `school_id`, `full_name`, `email`, `phone`, `password`, `role`, `gender`, `birth_date`, `photo`) VALUES (?,?,?,?,?,?,?,?,?,?)'
        const [row] = await database.query(sql, [uid, schoolId, name, email, phone, hashedPassword, type, gender, birth_date, photo])
        // account_Create_SMS_Service(uid, password, phone)
        return uid
    } catch (error) {
        console.error(error)
        return null
    }
}

const generateUserId = async (schoolId: string, role: string | UserType): Promise<string> => {
    const prefix = rolePrefixes[role];
    const today = new Date();
    const year = today.getFullYear();
    const yearPrefix = year.toString().slice(2);


    const [rows]: [RowDataPacket[], FieldPacket[]] = await database.query(`SELECT last_sequence FROM sequence_tracker WHERE school_id = ? AND year = ? AND role = ?`, [schoolId, year, prefix]);

    let lastSequence = 0;

    if (rows.length === 0) {
        // If no sequence, initialize with 23001 for this school and year
        lastSequence = 1;  // This will become 23001 for the first user
        await database.query(`INSERT INTO sequence_tracker (school_id, year, last_sequence, role) VALUES (?,?,?,?)`, [schoolId, year, lastSequence, prefix]);
    } else {
        // Increment the last sequence number
        lastSequence = rows[0].last_sequence + 1;
        await database.query(
            `UPDATE sequence_tracker SET last_sequence = ? WHERE school_id = ? AND year = ? AND role = ?`,
            [lastSequence, schoolId, year, prefix]
        );
    }
    return prefix == "ST" ? `${schoolId}${yearPrefix}${lastSequence.toString().padStart(3, '0')}` : `${schoolId}${lastSequence.toString().padStart(3, '0')}`;
};

// Role prefix mapping
const rolePrefixes: { [key: string]: string } = {
    'STUDENT': 'ST',
    'TEACHER': 'SF',
    'STAFF': 'SF',
    'ADMIN': 'SF',
    'DRIVER': 'SF',
};

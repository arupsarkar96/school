import { RowDataPacket } from "mysql2"
import database from "../config/database";
import SchoolID from "../utils/school-id-generator";

export interface School {
    school_id: string,
    school_name: string,
    school_address: string,
    school_state: string,
    school_district: string,
    school_phone: number,
    school_logo: string,
    subscription_id: number,
    subscription_end: string
}


export const school_registration__service = async (schoolname: string): Promise<string | null> => {

    const schoolId = await generate_school_id(schoolname, true)

    const today = new Date();
    today.setDate(today.getDate() + 30);
    const formattedDate = today.toISOString().split("T")[0];

    try {
        const sql = 'INSERT INTO Schools (`school_id`, `school_name`, `subscription_id`, `subscription_end`) VALUES (?,?,?,?)'
        const [rows] = await database.query(sql, [schoolId, schoolname, 1, formattedDate])
        return schoolId
    } catch (error) {
        console.error(error)
        return null
    }
}

const generate_school_id = async (schoolName: string, initial: boolean): Promise<string> => {
    const id = initial === true ? SchoolID.generateSchoolIdFromName(schoolName) : SchoolID.generateUniqueSchoolId()

    const check = await fetch_school__service(id)

    if (check == null) {
        return id
    } else {
        return generate_school_id(schoolName, false)
    }
}

export const fetch_school__service = async (schoolId: string): Promise<School | null> => {
    const sql = 'SELECT * FROM `Schools` WHERE `school_id` = ?'
    const [rows]: [RowDataPacket[], unknown] = await database.query(sql, [schoolId])
    return rows.length > 0 ? rows[0] as School : null
}

// export const update_school__service = async (schoolId: number, school: School) => {
//     const sql = 'UPDATE schools SET school_name = ?, school_address = ?, school_phone = ?, school_logo = ? WHERE school_id = ?'
//     const [rows] = await database.query(sql, [school.school_name, school.school_address, school.school_phone, school.school_logo, schoolId])
// }
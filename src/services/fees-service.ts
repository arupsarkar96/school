import { RowDataPacket } from "mysql2";
import database from "../config/database";


export interface Fee {
    fee_id: number,
    class_id: number,
    admission: number,
    tuition: number
}

export const fetch_fees__service = async (classId: number): Promise<Fee | null> => {
    try {
        const sql = 'SELECT * FROM `Fees` WHERE `class_id` = ?';
        const [rows]: [RowDataPacket[], unknown] = await database.query(sql, [classId]);
        return rows.length > 0 ? rows[0] as Fee : null;
    } catch (error) {
        console.error('Error fetching fee:', error);
        return null
    }
}

export const create_fees__service = async (classId: number) => {
    try {
        const sql = 'INSERT INTO `Fees`(`class_id`) VALUES (?)';
        const [rows]: [RowDataPacket[], unknown] = await database.query(sql, [classId]);
    } catch (error) {
        console.error('Error Creating fee:', error);
    }
}

export const update_fees__service = async (classId: number, admission: number, tuition: number) => {
    try {
        const sql = 'UPDATE `Fees` SET admission = ?, tuition = ? WHERE `class_id` = ?';
        const [rows]: [RowDataPacket[], unknown] = await database.query(sql, [admission, tuition, classId]);
    } catch (error) {
        console.error('Error Creating fee:', error);
    }
}
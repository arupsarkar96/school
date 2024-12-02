import { RowDataPacket } from "mysql2/promise"
import pool from "../../db"
import { Session } from "../interface/sessions"


export const getAllSessions = async (schoolId: number | string): Promise<Session[]> => {
    const connection = await pool.getConnection();
    const sql = 'SELECT * FROM `sessions` WHERE `school_id` = ? ORDER BY `end` DESC';
    const [rows] = await connection.query(sql, [schoolId]);
    connection.release();
    return rows as Session[]
}

export const getAdmissionSessions = async (schoolId: number | string): Promise<Session[]> => {
    const connection = await pool.getConnection();
    const sql = 'SELECT * FROM `sessions` WHERE `school_id` = ? AND `admission` = 1 ORDER BY `session_id` DESC';
    const [rows] = await connection.query(sql, [schoolId]);
    connection.release();
    return rows as Session[]
}

export const getActiveSessions = async (schoolId: number | string): Promise<Session[]> => {
    const connection = await pool.getConnection();
    const sql = 'SELECT * FROM `sessions` WHERE `school_id` = ? AND `status` = 1 ORDER BY `session_id` DESC';
    const [rows] = await connection.query(sql, [schoolId]);
    connection.release();
    return rows as Session[]
}

export const insertSession = async (schoolId: string | number, start: string, end: string): Promise<number> => {
    const connection = await pool.getConnection();
    const sql = 'INSERT INTO sessions(`school_id`, `start`, `end`, `admission`, `status`) VALUES (?,?,?,?,?)';
    const [rows] = await connection.query(sql, [schoolId, start, end, 1, 1]);
    connection.release();
    const insertedId = (rows as any).insertId; // Type assertion may be necessary
    return insertedId
}

export const updateSession = async (schoolId: string, sessionId: string, admission: string, status: string) => {
    const connection = await pool.getConnection();
    const sql = 'UPDATE sessions SET `admission` = ?, `status` = ? WHERE `session_id` = ?';
    const [rows] = await connection.query(sql, [admission, status, sessionId]);
    connection.release();
}
import { RowDataPacket } from "mysql2/promise"
import pool from "../../db"
import { Inventory } from "../interface/inventory"


export const fetchInventoriesService = async (schoolId: number): Promise<Inventory[]> => {
    const connection = await pool.getConnection();
    const sql = 'SELECT * FROM `inventories` WHERE `school_id` = ?'
    const [rows] = await connection.query(sql, [schoolId])
    connection.release();
    return rows as Inventory[];
}

export const sellUpdate__Inventory = async (id: number, count: number) => {
    const connection = await pool.getConnection();
    const sql = 'UPDATE `inventories` SET item_stock = item_stock - ? WHERE item_id = ?'
    await connection.query(sql, [count, id])
    connection.release();
}

export const update_inventory__service = async (data: Inventory) => {
    const connection = await pool.getConnection();
    const sql = 'UPDATE `inventories` SET item_stock = ?, item_price = ? WHERE item_id = ?'
    await connection.query(sql, [data.item_stock, data.item_price, data.item_id])
    connection.release();
}

export const insert_inventory__service = async (data: Inventory) => {
    const connection = await pool.getConnection();
    const sql = 'INSERT INTO `inventories` (school_id, item_name, item_stock, item_price) VALUES (?,?,?,?)'
    await connection.query(sql, [data.school_id, data.item_name, data.item_stock, data.item_price])
    connection.release();
}
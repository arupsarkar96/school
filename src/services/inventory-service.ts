import { FieldPacket, RowDataPacket } from "mysql2"
import database from "../config/database"


export interface Inventory {
    item_id: number,
    school_id: number,
    item_code: string,
    item_name: string,
    item_quantity: number,
    item_price: number
}



export const sell_update_inventory__service = async (id: number, count: number) => {
    const sql = 'UPDATE `Products` SET item_quantity = item_quantity - ? WHERE item_id = ?'
    await database.query(sql, [count, id])
}


export const update_inventory__service = async (id: string, name: string, price: string, quantity: string) => {

    try {
        const sql = 'UPDATE `Products` SET `item_name` = ?, `item_quantity` = ?, `item_price` = ? WHERE `item_id` = ?'
        await database.query(sql, [name, quantity, price, id])
    } catch (error) {
        console.error(error)
    }
}


export const fetch_inventory__service = async (schoolId: string, page: number): Promise<Inventory[]> => {
    const offset = page * 10

    try {
        const sql0 = "SELECT * FROM `Products` WHERE `school_id` = ? ORDER BY `item_name` ASC LIMIT 10 OFFSET ?"
        const [rows]: [RowDataPacket[], FieldPacket[]] = await database.query(sql0, [schoolId, offset])
        return rows as Inventory[]
    } catch (error) {
        console.error(error)
        return []
    }
}

export const insert_inventory__service = async (schoolId: string, code: string, name: string, price: string, quantity: string): Promise<boolean> => {

    try {

        if (code.length > 0) {
            const sql0 = "SELECT * FROM `Products` WHERE `school_id` = ? AND `item_code` = ?"
            const [rows]: [RowDataPacket[], FieldPacket[]] = await database.query(sql0, [schoolId, code])

            if (rows.length == 0) {
                const sql = 'INSERT INTO `Products` (`school_id`, `item_code`, `item_name`, `item_quantity`, `item_price`) VALUES (?,?,?,?,?)'
                await database.query(sql, [schoolId, code, name, quantity, price])
                return true
            } else {
                return false
            }

        } else {
            const sql = 'INSERT INTO `Products` (`school_id`, `item_code`, `item_name`, `item_quantity`, `item_price`) VALUES (?,?,?,?,?)'
            await database.query(sql, [schoolId, code, name, quantity, price])
            return true
        }
    } catch (error) {
        console.error(error)
        return false
    }
}
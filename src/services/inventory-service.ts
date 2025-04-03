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

export interface ProductLog {
    _id: number,
    product_id: number,
    type: string
}


export const sell_update_inventory__service = async (id: number, count: number, staffId: string) => {
    const sql = 'UPDATE `Products` SET product_quantity = product_quantity - ? WHERE product_id = ?'
    await database.query(sql, [count, id])
    insert_product_log__service(id, staffId, count, "EXIT")
}


export const update_inventory__service = async (id: string, name: string, price: string, quantity: string, staffId: string) => {

    try {
        const sql = 'UPDATE `Products` SET `product_name` = ?, `product_quantity` = `product_quantity` + ?, `product_price` = ? WHERE `product_id` = ?'
        await database.query(sql, [name, quantity, price, id])

        if (parseInt(quantity) > 0) {
            insert_product_log__service(parseInt(id), staffId, parseInt(quantity), "ENTRY")
        }

    } catch (error) {
        console.error(error)
    }
}


export const fetch_inventory__service = async (schoolId: string, page: number): Promise<Inventory[]> => {
    const offset = page * 10

    try {
        const sql0 = "SELECT * FROM `Products` WHERE `school_id` = ? ORDER BY `product_name` ASC LIMIT 10 OFFSET ?"
        const [rows]: [RowDataPacket[], FieldPacket[]] = await database.query(sql0, [schoolId, offset])
        return rows as Inventory[]
    } catch (error) {
        console.error(error)
        return []
    }
}

export const insert_inventory__service = async (schoolId: string, code: string, name: string, price: string, quantity: string, staffId: string): Promise<boolean> => {

    try {
        if (code.length > 0) {
            const sql0 = "SELECT * FROM `Products` WHERE `school_id` = ? AND `product_code` = ?"
            const [rows]: [RowDataPacket[], FieldPacket[]] = await database.query(sql0, [schoolId, code])

            if (rows.length == 0) {
                const sql = 'INSERT INTO `Products` (`school_id`, `product_code`, `product_name`, `product_quantity`, `product_price`) VALUES (?,?,?,?,?)'
                const [rows] = await database.query(sql, [schoolId, code, name, quantity, price])
                insert_product_log__service((rows as any).insertId, staffId, parseInt(quantity), "ENTRY")
                return true
            } else {
                return false
            }

        } else {
            const sql = 'INSERT INTO `Products` (`school_id`, `product_code`, `product_name`, `product_quantity`, `product_price`) VALUES (?,?,?,?,?)'
            const [rows] = await database.query(sql, [schoolId, code, name, quantity, price])
            insert_product_log__service((rows as any).insertId, staffId, parseInt(quantity), "ENTRY")
            return true
        }
    } catch (error) {
        console.error(error)
        return false
    }
}

const insert_product_log__service = async (productId: number, staffId: string, quantity: number, type: "ENTRY" | "EXIT" = "ENTRY") => {
    try {
        const sql = "INSERT INTO `Product_Logs` (`product_id`, `staff_id`, `type`, `quantity`) VALUES (?,?,?,?)"
        await database.query(sql, [productId, staffId, type, quantity])
    } catch (error) {
        console.error(error)
    }
}

export const fetch_product_log__service = async (productId: number, page: number): Promise<ProductLog[]> => {
    const offset = page * 10
    const sql = "SELECT `Product_Logs`.*, Staffs.staff_name FROM `Product_Logs` LEFT JOIN Staffs ON Product_Logs.staff_id = Staffs.staff_id WHERE `product_id` = ? ORDER BY _id DESC LIMIT 10 OFFSET ?"
    try {
        const [rows] = await database.query(sql, [productId, offset])
        return rows as ProductLog[]
    } catch (error) {
        console.error(error)
        return []
    }
}
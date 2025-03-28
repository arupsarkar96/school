import { FieldPacket, RowDataPacket } from "mysql2"
import database from "../config/database"

export interface Cart {
    cart_id: number,
    school_id: string,
    student_id: string
}

export interface CartItems {
    cart_id: number,
    product_id: number,
    product_name: string,
    product_quantity: number,
    product_price: number
}






export const update_cart_items__service = async (data: CartItems) => {
    try {
        const sql2 = "UPDATE `Cart_Items` SET `product_quantity` = ? WHERE `product_id` = ? AND `cart_id` = ?"
        const [rows, field]: [RowDataPacket[], FieldPacket[]] = await database.query(sql2, [data.product_quantity, data.product_id, data.cart_id])
    } catch (error) {
        console.error(error)
    }
}

export const delete_cart_items__service = async (cartId: number, product: number) => {
    try {
        const sql2 = "DELETE FROM `Cart_Items` WHERE `product_id` = ? AND `cart_id` = ?"
        const [rows, field]: [RowDataPacket[], FieldPacket[]] = await database.query(sql2, [product, cartId])
    } catch (error) {
        console.error(error)
    }
}

export const create_cart_items__service = async (data: CartItems) => {
    try {
        const sql2 = "INSERT INTO `Cart_Items` (`cart_id`, `product_id`, `product_name`, `product_quantity`, `product_price`) VALUES (?,?,?,?,?)"
        const [rows, field]: [RowDataPacket[], FieldPacket[]] = await database.query(sql2, [data.cart_id, data.product_id, data.product_name, data.product_quantity, data.product_price])
    } catch (error) {
        console.error(error)
    }
}

export const fetch_pos_cart_items__service = async (cartId: number): Promise<CartItems[]> => {
    try {
        const sql2 = "SELECT * FROM `Cart_Items` WHERE cart_id = ?"
        const [rows, field]: [RowDataPacket[], FieldPacket[]] = await database.query(sql2, [cartId])
        return rows as CartItems[]
    } catch (error) {
        console.error(error)
        return []
    }
}

export const create_pos_cart__service = async (studentId: string, schoolId: string): Promise<number | null> => {
    const sql1 = "SELECT * FROM `Carts` WHERE `school_id` = ? AND `student_id` = ?"
    try {
        const [count]: [RowDataPacket[], FieldPacket[]] = await database.query(sql1, [schoolId, studentId])
        if (count.length > 0) {
            return (count[0] as Cart).cart_id
        } else {
            const sql2 = "INSERT INTO Carts (school_id, student_id) VALUES (?,?)"
            const [rows, field]: [RowDataPacket[], FieldPacket[]] = await database.query(sql2, [schoolId, studentId])
            return (rows as any).insertId
        }
    } catch (error) {
        return null
    }
}

export const fetch_pos_cart__service = async (cartId: number): Promise<Cart | null> => {
    const sql1 = "SELECT * FROM `Carts` WHERE `cart_id` = ?"
    try {
        const [count]: [RowDataPacket[], FieldPacket[]] = await database.query(sql1, [cartId])
        return count.length > 0 ? count[0] as Cart : null
    } catch (error) {
        return null
    }
}


export const delete_pos_cart__service = async (cartId: number) => {
    const sql1 = "DELETE FROM `Carts` WHERE `cart_id` = ?"
    try {
        const [count]: [RowDataPacket[], FieldPacket[]] = await database.query(sql1, [cartId])
    } catch (error) {
        console.error(error)
    }
}
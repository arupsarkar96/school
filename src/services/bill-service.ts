import { FieldPacket, RowDataPacket } from "mysql2";
import database from "../config/database";

export interface Bill {
    bill_id: number;
    school_id: string;
    student_id: string;
    staff_id: string;
    transaction_id: string | null;
    amount: string;
    discount: string;
    total: number;
    bill_date: string;  // ISO 8601 formatted date string
    bill_status: string;
}

export interface BillItem {
    id: number,
    bill_id: number,
    description: string,
    quantity: number,
    amount: number
}


export const fetch_student_bill__service = async (schoolId: string, studentId: string, page: number): Promise<Bill[]> => {
    const offset = page * 10
    const sql = "SELECT Invoices.invoice_id, Invoices.invoice_date, Invoices.amount, Invoices.discount, Invoices.total, Invoices.status, Students.student_name, Students.student_id FROM `Invoices` LEFT JOIN Students ON Invoices.student_id = Students.student_id WHERE `invoice_date` <= CURDATE() AND Invoices.`school_id` = ? AND Invoices.student_id = ? ORDER BY Invoices.invoice_id DESC LIMIT 10 OFFSET ?"

    try {
        const [rows] = await database.query(sql, [schoolId, studentId, offset])
        return rows as Bill[]
    } catch (error) {
        console.error(error)
        return []
    }
}


export const create_bill__service = async (schoolId: string, studentId: string, staffId: string, amount: number, discount: number, date: string): Promise<number> => {
    const sql = 'INSERT INTO `Invoices` (`school_id`, `student_id`, `staff_id`, `invoice_date`, `amount`, `discount`, `status`) VALUES (?,?,?,?,?,?,?)';

    const [rows] = await database.query(sql, [schoolId, studentId, staffId, date, amount, discount, "Pending"]);
    const billId: number = (rows as any).insertId;
    return billId;
}

export const fetch_all_bill__service = async (schoolId: string, page: number): Promise<Bill[]> => {
    const offset = page * 10
    const sql = "SELECT Invoices.invoice_id, Invoices.invoice_date, Invoices.amount, Invoices.discount, Invoices.total, Invoices.status, Students.student_name, Students.student_id FROM `Invoices` LEFT JOIN Students ON Invoices.student_id = Students.student_id WHERE `invoice_date` <= CURDATE() AND Invoices.`school_id` = ? ORDER BY Invoices.invoice_id DESC LIMIT 10 OFFSET ?"

    try {
        const [rows] = await database.query(sql, [schoolId, offset])
        return rows as Bill[]
    } catch (error) {
        console.error(error)
        return []
    }
}

export const fetch_bill__service = async (schoolId: string, billId: number): Promise<Bill | null> => {
    const sql = "SELECT Invoices.invoice_id, Invoices.invoice_date, Invoices.amount, Invoices.discount, Invoices.total, Invoices.status, Students.student_name, Students.student_id FROM `Invoices` LEFT JOIN Students ON Invoices.student_id = Students.student_id WHERE `invoice_id` = ? AND Invoices.school_id = ?"

    try {
        const [rows]: [RowDataPacket[], FieldPacket[]] = await database.query(sql, [billId, schoolId])
        return rows.length > 0 ? rows[0] as Bill : null
    } catch (error) {
        console.error(error)
        return null
    }
}

export const fetch_bill_items__service = async (billId: number): Promise<BillItem[]> => {
    const sql = "SELECT * FROM `Invoice_Items` WHERE `invoice_id` = ?"
    try {
        const [rows]: [RowDataPacket[], FieldPacket[]] = await database.query(sql, [billId])
        return rows as BillItem[]
    } catch (error) {
        console.error(error)
        return []
    }
}

export const create_bill_items__service = async (billId: number, itemId: number | null, description: string, quantity: number, price: number) => {
    const sql = "INSERT INTO `Invoice_Items` (`invoice_id`, `product_id`, `description`, `quantity`, `price`) VALUES (?,?,?,?,?)"
    try {
        const [rows]: [RowDataPacket[], FieldPacket[]] = await database.query(sql, [billId, itemId, description, quantity, price])
    } catch (error) {
        console.error(error)
    }
}

export const create_bulk_bill_items__service = async (data: any) => {
    const sql = "INSERT INTO `Invoice_Items` (`invoice_id`, `product_id`, `description`, `quantity`, `price`) VALUES ?"
    try {
        const [rows]: [RowDataPacket[], FieldPacket[]] = await database.query(sql, [data])
    } catch (error) {
        console.error(error)
    }
}

export const pay_bill__service = async (billId: number): Promise<boolean> => {
    const sql = "UPDATE `Invoices` SET status = 'Paid' WHERE `invoice_id` = ?"
    try {
        await database.query(sql, [billId])
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

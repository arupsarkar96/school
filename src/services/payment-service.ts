import database from "../config/database"

export interface Payment {
    payment_id: number
}

export const create_payment__service = async (billId: number, schoolId: string, staffId: string, amount: number, method: string): Promise<boolean> => {
    const sql = "INSERT INTO `Payments` (`school_id`, `invoice_id`, `staff_id`, `amount`, `method`) VALUES (?,?,?,?,?)"

    try {
        await database.query(sql, [schoolId, billId, staffId, amount, method])
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

export const fetch_payment__service = async (schoolId: string, page: number): Promise<Payment[]> => {
    const offset = page * 10
    const sql = "SELECT * FROM `Payments` WHERE `school_id` = ? ORDER BY `payment_id` DESC LIMIT 10 OFFSET ?"
    try {
        const [rows] = await database.query(sql, [schoolId, offset])
        return rows as Payment[]
    } catch (error) {
        console.error(error)
        return []
    }
}
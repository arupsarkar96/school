import database from "../config/database"


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

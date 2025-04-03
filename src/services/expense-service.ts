import database from "../config/database"

export interface Expense {
    expense_id: number
}

export const fetch_expense__service = async (schoolId: string, page: number): Promise<Expense[]> => {
    const offset = page * 10
    const sql = "SELECT * FROM Expenses WHERE `school_id` = ? ORDER BY `expense_id` DESC LIMIT 10 OFFSET ?"

    try {
        const [rows] = await database.query(sql, [schoolId, offset])
        return rows as Expense[]
    } catch (error) {
        console.error(error)
        return []
    }
}


export const create_expense__service = async (
    schoolId: string,
    bill: string | number,
    note: string,
    amount: string | number
): Promise<boolean> => {

    const sql = "INSERT INTO `Expenses` (`school_id`, `expense_bill`, `expense_note`, `expense_amount`) VALUES (?,?,?,?)"

    // Convert empty bill to NULL
    const formattedBill = bill === "" ? null : bill

    try {
        const [rows] = await database.query(sql, [schoolId, formattedBill, note, amount])
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}


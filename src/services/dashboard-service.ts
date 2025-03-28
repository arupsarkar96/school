import database from "../config/database"


export const fetch_dashboard_payment__service = async (schoolId: string) => {
    const sql = "SELECT SUM(amount) AS today FROM Payments WHERE DATE(payment_date) = CURDATE() AND school_id = ?; SELECT SUM(amount) AS month FROM Payments WHERE DATE(payment_date) >= CURDATE() - INTERVAL 30 DAY AND school_id = ?"
    try {
        const [rows] = await database.query(sql, [schoolId, schoolId])
        return rows
    } catch (error) {
        console.error(error)
        return null
    }
}

export const fetch_dashboard_users__service = async (schoolId: string) => {
    const sql = "SELECT COUNT(student_id) AS students FROM Students WHERE school_id = ?; SELECT COUNT(staff_id) AS staffs FROM Staffs WHERE school_id = ?"
    try {
        const [rows] = await database.query(sql, [schoolId, schoolId])
        return rows
    } catch (error) {
        console.error(error)
        return null
    }
}
import { FieldPacket, RowDataPacket } from "mysql2"
import database from "../config/database"
import { fetch_fees__service } from "./fees-service"
import { Class } from "./class-service"
import { create_bill__service, create_bill_items__service } from "./bill-service"
import { fetch_active_session__service } from "./session-service"
import { fetch_student__service } from "./student-service"


export interface Enrollment {
    enrollment_id: number,
    class_id: number,
    session_id: number,
    student_id: string,
    roll: number,
    status: string
}

export interface EnrollmentWithClass extends Enrollment, Class {

}

export const fetch_active_enrollment__service = async (studentId: string): Promise<EnrollmentWithClass | number> => {

    const sql = "SELECT * FROM `Enrollments` LEFT JOIN Courses ON Enrollments.class_id = Courses.class_id WHERE `student_id` = ? AND `status` = 'ACTIVE'"

    try {
        const [rows]: [RowDataPacket[], FieldPacket[]] = await database.query(sql, [studentId])
        return rows.length > 0 ? rows[0] as EnrollmentWithClass : 404
    } catch (error) {
        console.error(error)
        return 500
    }
}

export const create_enrollment__service = async (classId: number, studentId: string, schoolId: string, staffId: string): Promise<EnrollmentWithClass | number> => {

    const student = await fetch_student__service(studentId)

    if (student == null) {
        return 404
    }


    const session = await fetch_active_session__service(schoolId)

    const preSql = "SELECT COUNT(*) AS count FROM `Enrollments` WHERE `session_id` = ? AND `class_id` = ? AND `student_id` = ?"
    const [checkRows]: [RowDataPacket[], unknown] = await database.query(preSql, [session?.session_id, classId, studentId]);

    if (checkRows[0].count > 0) {
        return await fetch_active_enrollment__service(studentId)
    } else {
        const currentIndex = await count_enrollments(classId, session?.session_id!!)
        const roll = currentIndex + 1
        const sql = "INSERT INTO `Enrollments` (`class_id`, `session_id`, `student_id`, `roll`) VALUES (?,?,?,?); UPDATE `Students` SET `status` = 'ACTIVE' WHERE `student_id` = ?"

        try {
            const [rows] = await database.query(sql, [classId, session?.session_id, studentId, roll, studentId])
            generateEnrollmentBills(classId, studentId, schoolId, staffId)
            return {
                enrollment_id: (rows as any).insertId,
                class_id: classId,
                school_id: schoolId,
                class_name: "",
                session_id: session?.session_id!!,
                student_id: studentId,
                roll: roll,
                status: "ACTIVE"
            }
        } catch (error: any) {
            console.error(error)
            return 500
        }
    }
}

const count_enrollments = async (classId: number, sessionId: number): Promise<number> => {
    const sql = "SELECT * FROM Enrollments WHERE class_id = ?  AND session_id = ?"
    const [rows]: [RowDataPacket[], FieldPacket[]] = await database.query(sql, [classId, sessionId])
    return rows.length
}

const generateEnrollmentBills = async (classId: number, studentId: string, schoolId: string, staffId: string) => {

    const fees = await fetch_fees__service(classId)

    const monthly = getFirstDatesOfNextYear()


    const adm = fees?.admission
    const tution = fees?.tuition
    const today = new Date().toISOString().split('T')[0];
    const billId = await create_bill__service(schoolId, studentId, staffId, adm!!, 0, today)
    create_bill_items__service(billId, null, "Admission fee", 1, adm!!)

    monthly.forEach(async (date) => {
        const bId = await create_bill__service(schoolId, studentId, staffId, tution!!, 0, date)
        await create_bill_items__service(bId, null, "Tuition fee", 1, tution!!)
    });



}

const getFirstDatesOfNextYear = (): string[] => {
    const firstDates = [];
    const currentDate = new Date();
    for (let i = 0; i < 12; i++) {
        const firstOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + i + 1, 1);
        firstDates.push(firstOfMonth.toISOString().split('T')[0]);
    }
    return firstDates;
};

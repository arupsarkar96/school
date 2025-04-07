import { Request, Response } from "express";
import { create_student__service, fetch_draft_students__service } from "../services/student-service";
import { fetch_student_bill__service } from "../services/bill-service";





export const fetchDraftStudents = async (req: Request, res: Response): Promise<void> => {
    const schoolId: string = req.headers["x-school"] as string;

    const page: number = parseInt(req.query.page as string) || 0
    const students = await fetch_draft_students__service(schoolId, page)

    res.status(200).json({
        students: students,
        next: students.length == 10 ? page + 1 : 0
    })
}


export const fetchStudentInvoices = async (req: Request, res: Response): Promise<void> => {
    const schoolId: string = req.headers["x-school"] as string;
    const studentId: string = req.params.id
    const page: number = parseInt(req.query.page as string) || 0
    const receipts = await fetch_student_bill__service(schoolId, studentId, page)

    res.status(200).json({
        invoices: receipts,
        next: receipts.length == 10 ? page + 1 : 0
    })
}


export const createStudent = async (req: Request, res: Response): Promise<void> => {

    const schoolId: string = req.headers["x-school"] as string;
    const { name, phone, gender, birth_date, photo, parent_name, address } = req.body

    const id = await create_student__service(schoolId, name, phone, gender, birth_date, address, photo, parent_name)

    if (id == null) {
        res.status(400).json({
            status: "error",
            message: "Registration failed"
        })
    } else {
        res.status(201).json({
            status: "success",
            message: id
        })
    }
}
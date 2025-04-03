import { Request, Response } from "express";
import { create_class__service, fetch_class__service, fetch_classes__service } from "../services/class-service";
import { fetch_fees__service, update_fees__service } from "../services/fees-service";
import { create_subject__service, delete_subject__service, fetch_subject__service } from "../services/subject-service";
import { fetch_enrollments_by_class__service } from "../services/enrollment-service";


export const createClass = async (req: Request, res: Response): Promise<void> => {
    const schoolId: string = req.headers["x-school"] as string;
    const { name } = req.body

    const d = await create_class__service(schoolId, name)

    if (d) {
        res.status(201).json({
            status: "success",
            message: "Class created succesfully !"
        })
    } else {
        res.status(400).json({
            status: "error",
            message: "Try again"
        })
    }
}

export const fetchAllClass = async (req: Request, res: Response): Promise<void> => {
    const schoolId: string = req.headers["x-school"] as string;

    const classes = await fetch_classes__service(schoolId)

    res.status(200).json({
        courses: classes
    })
}

export const fetchClassWithFees = async (req: Request, res: Response): Promise<void> => {
    const schoolId: string = req.headers["x-school"] as string;
    const classId: number = parseInt(req.params.id)

    const classes = await fetch_class__service(classId)


    if (classes == null) {
        res.status(404).json({
            status: "error",
            message: "Class not found"
        })
    } else {
        const fees = await fetch_fees__service(classId)
        res.status(200).json({
            course: classes,
            fees: fees
        })
    }
}

export const updateClassFees = async (req: Request, res: Response): Promise<void> => {
    const schoolId: string = req.headers["x-school"] as string;
    const classId: number = parseInt(req.params.id)

    const { admission, tuition } = req.body
    update_fees__service(classId, admission, tuition)
    res.status(200).json({
        status: "success",
        message: "Fees updated"
    })
}

export const fetchClassWithSubjects = async (req: Request, res: Response): Promise<void> => {
    const schoolId: string = req.headers["x-school"] as string;
    const classId: number = parseInt(req.params.id)

    const classes = await fetch_class__service(classId)


    if (classes == null) {
        res.status(404).json({
            status: "error",
            message: "Class not found"
        })
    } else {
        const subjects = await fetch_subject__service(classId)
        res.status(200).json({
            course: classes,
            subjects: subjects
        })
    }

}

export const deleteSubject = async (req: Request, res: Response): Promise<void> => {
    const schoolId: string = req.headers["x-school"] as string;
    const classId: number = parseInt(req.params.id)
    const subjectId: number = parseInt(req.params.subjectId)
    delete_subject__service(classId, subjectId)
    res.status(200).json({
        status: "success",
        message: "Subject deleted"
    })
}

export const createSubject = async (req: Request, res: Response): Promise<void> => {
    const schoolId: string = req.headers["x-school"] as string;
    const classId: number = parseInt(req.params.id)
    const { name } = req.body

    create_subject__service(classId, name.toUpperCase())
    res.status(201).json({
        status: "success",
        message: "Subject created"
    })
}

export const fetchStudents = async (req: Request, res: Response): Promise<void> => {

    const course: number = parseInt(req.params.id as string)
    const session: number = parseInt(req.query.session as string)

    const students = await fetch_enrollments_by_class__service(course, session)

    res.status(200).json({
        students: students
    })


}
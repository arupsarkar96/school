import { Request, Response } from "express";
import { create_enrollment__service } from "../services/enrollment-service";


export const createEnrollment = async (req: Request, res: Response): Promise<void> => {
    const schoolId: string = req.headers["x-school"] as string;
    const staffId: string = req.headers["x-id"] as string;

    const { class_id, student_id } = req.body

    if (!class_id) {
        res.status(400).json({
            status: "error",
            message: "Select CLASS"
        })
        return
    }
    if (!student_id) {
        res.status(400).json({
            status: "error",
            message: "Select STUDENT"
        })
        return
    }

    const enroll = await create_enrollment__service(parseInt(class_id), student_id, schoolId, staffId)

    if (typeof enroll === "number") {
        res.status(enroll).json({
            status: "error",
            message: enroll == 404 ? "Student ID not found" : "Server error"
        })
    } else {
        res.status(201).json({
            status: "success",
            message: `Class Roll: ${enroll.roll}`
        })
    }
}
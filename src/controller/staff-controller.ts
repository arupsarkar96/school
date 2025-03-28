import { Request, Response } from "express";
import { create_staff__service, fetch_staffs__service } from "../services/staff-service";


export const fetchStaffs = async (req: Request, res: Response): Promise<void> => {
    const schoolId: string = req.headers["x-school"] as string
    const page: number = parseInt(req.query.page as string) || 0
    const u = await fetch_staffs__service(schoolId, page)
    res.status(200).json({
        staffs: u,
        next: u.length == 10 ? page + 1 : 0
    })
}


export const createStaff = async (req: Request, res: Response): Promise<void> => {
    const { name, phone, role, gender } = req.body
    const schoolId: string = req.headers["x-school"] as string

    const id = await create_staff__service(schoolId, name, phone, gender, role)

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
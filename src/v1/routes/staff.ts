
import { Router } from "express";
import { adminAuthorize } from "../middleware/auth";
import { getAllStaffController, insertStaffController } from "../controller/staff";
import { Staff } from "../interface/staff";

const v1Staff = Router()


v1Staff.get('/', adminAuthorize, async (req, res) => {
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const data = await getAllStaffController(schoolId)
    res.json(data)
})


// Add new staff
v1Staff.post('/', adminAuthorize, async (req, res) => {
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const data: Staff = req.body
    const staffId: number = await insertStaffController(schoolId, data)
    res.json({ staffId: staffId, message: "Staff data created" })
})



export default v1Staff;
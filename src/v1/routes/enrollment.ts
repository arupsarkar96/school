import { Router } from "express";
import { fetch_Enrollmets__Service } from "../service/enrollment";
import { adminAuthorize, teacherAuthorize } from "../middleware/auth";


const v1Enrollment = Router();

v1Enrollment.get('/:session/:classId', teacherAuthorize, async (req, res) => {
    const { session, classId } = req.params
    const data = await fetch_Enrollmets__Service(parseInt(session), parseInt(classId))
    res.json(data)
})

export default v1Enrollment;
import { Router } from "express";
import { createSession, fetchAllSession } from "../controller/session-controller";
import { adminAndStaffAuthorize, adminAuthorize, teacherAuthorize } from "../middleware/auth";

const sessionRoute = Router();

sessionRoute.get('/all', adminAndStaffAuthorize, fetchAllSession)

sessionRoute.get('/active', adminAndStaffAuthorize, fetchAllSession)

sessionRoute.post('/', adminAuthorize, createSession)

sessionRoute.put('/:session', adminAuthorize, async (req, res) => {
    // const schoolId: string = req.headers["x-school"] as string;
    // const { session } = req.params
    // const { admission, status } = req.body
    // updateSession(schoolId, session, admission, status)
    // res.send("OK")
})

export default sessionRoute;
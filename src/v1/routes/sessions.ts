import { Router } from "express";
import { adminAuthorize, teacherAuthorize } from "../middleware/auth";
import { getActiveSessions, getAdmissionSessions, getAllSessions, insertSession, updateSession } from "../service/sessions";

const v1Sessions = Router();

v1Sessions.get('/all', adminAuthorize, async (req, res) => {
    const schoolId: string = req.headers["x-school"] as string;
    const data = await getAllSessions(schoolId);
    res.json(data);
})

v1Sessions.get('/admission', adminAuthorize, async (req, res) => {
    const schoolId: string = req.headers["x-school"] as string;
    const data = await getAdmissionSessions(schoolId);
    res.json(data);
})

v1Sessions.get('/active', teacherAuthorize, async (req, res) => {
    const schoolId: string = req.headers["x-school"] as string;
    const data = await getActiveSessions(schoolId);
    res.json(data);
})

v1Sessions.post('/', adminAuthorize, async (req, res) => {
    const schoolId: string = req.headers["x-school"] as string;
    const { start, end } = req.body
    const id = await insertSession(schoolId, start, end);
    res.json({ session_id: id, start: start, end: end, admission: 1, status: 1 });
})

v1Sessions.put('/:session', adminAuthorize, async (req, res) => {
    const schoolId: string = req.headers["x-school"] as string;
    const { session } = req.params
    const { admission, status } = req.body
    updateSession(schoolId, session, admission, status)
    res.send("OK")
})

export default v1Sessions;
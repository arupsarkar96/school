import { Router } from "express";
import { adminAuthorize } from "../middleware/auth";
import { addClassSubject, deleteSubject } from "../service/subject";
import { Subject } from "../interface/subject";



const v1Subject = Router();

v1Subject.post('/:classId', adminAuthorize, async (req, res) => {
    const classId: number = parseInt(req.params.classId)
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const { name } = req.body
    const subjectId: number = await addClassSubject(schoolId, classId, name)
    const subject: Subject = {
        subject_id: subjectId,
        subject_name: name,
        class_id: classId
    }
    res.json(subject)
})

v1Subject.delete('/:subjectId', adminAuthorize, async (req, res) => {
    const subjectId: number = parseInt(req.params.subjectId)
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    deleteSubject(schoolId, subjectId)
    res.json({ "status": "ok" })
})



export default v1Subject;
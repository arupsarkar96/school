import { Router } from "express";
import { adminAuthorize, teacherAuthorize } from "../middleware/auth";
import { Class } from "../interface/class";
import { createClass, fetch_Class__Controller, getClassCompleteDetails } from "../controller/class";


const v1Class = Router();

v1Class.get('/', teacherAuthorize, async (req, res) => {
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const classes = await fetch_Class__Controller(schoolId)
    res.json(classes)
})

// Get Complete class details
v1Class.get('/:classId', teacherAuthorize, async (req, res) => {
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const classId: number = parseInt(req.params.classId as string)
    const classes = await getClassCompleteDetails(schoolId, classId)
    res.json(classes)
})

v1Class.post('/', adminAuthorize, async (req, res) => {
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const { name } = req.body
    const _class: Class = await createClass(schoolId, name)
    res.json(_class);
})


export default v1Class;
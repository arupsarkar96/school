import { Router } from "express";
import { adminAuthorize, teacherAuthorize } from "../middleware/auth";
import { getActiveExams, getAllExams, insertExamController, insertMarksController, updateExamStatus } from "../controller/exam";
import { ExamData } from "../interface/exam";


const v1Exam = Router()


v1Exam.get('/all', adminAuthorize, async (req, res) => {
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const exams = await getAllExams(schoolId)
    res.json(exams)
})

v1Exam.get('/active', teacherAuthorize, async (req, res) => {
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const exams = await getActiveExams(schoolId)
    res.json(exams)
})


v1Exam.post('/', adminAuthorize, async (req, res) => {
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const { name }: { name: string } = req.body
    const d = await insertExamController(schoolId, name)
    res.status(201).json({ examId: d, message: "Exam created" })
})


v1Exam.post('/marks', teacherAuthorize, async (req, res) => {
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const data: ExamData = req.body
    insertMarksController(data)
    res.sendStatus(200)
})

v1Exam.patch('/:id', adminAuthorize, async (req, res) => {
    const id = req.params.id

    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const { status }: { status: boolean } = req.body
    updateExamStatus(schoolId, id, status)
    res.sendStatus(200)
})

export default v1Exam;
import { Router } from "express";
import { adminAuthorize } from "../middleware/auth";
import { AdmissionEnrollStudent, EnrollStudent, Student, StudentStatus } from "../interface/student";
import { AdmissionStudentController, FetchStudentController, GetAllStudentController, GetStudent_Info_About__Controller, promote_Student__Controller, ResgisterStudentController, SearchStudentController, update_Student__Controller } from "../controller/student";
import { fetch_Bill_Student__Controller } from "../controller/bill";

const v1Student = Router();

// Inquiry Submission
v1Student.post('/draft', adminAuthorize, async (req, res) => {
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const data: EnrollStudent = req.body
    const serverData: Student = await ResgisterStudentController(schoolId, data)
    res.json(serverData)
})

// Inqury List fetch, only admin can fetch
v1Student.get('/draft', adminAuthorize, async (req, res) => {
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const serverData: Student[] = await FetchStudentController(schoolId, StudentStatus.Draft)
    res.json(serverData)
})


// New Admission
v1Student.post('/admission', adminAuthorize, async (req, res) => {
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const staffId: number = parseInt(req.headers["x-id"] as string);
    const data: AdmissionEnrollStudent = req.body
    const billId: number = await AdmissionStudentController(staffId, schoolId, data, data.class, data.session)
    res.json({ bill: billId })
})

// All students
v1Student.get('/', adminAuthorize, async (req, res) => {
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const serverData: Student[] = await GetAllStudentController(schoolId)
    res.json(serverData)
})

// Search students
v1Student.get('/search', adminAuthorize, async (req, res) => {
    const q: string = req.query.q as string
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const serverData: Student[] = await SearchStudentController(schoolId, q)
    res.json(serverData)
})

// Find students
v1Student.get('/info/:id', adminAuthorize, async (req, res) => {
    const id: number = parseInt(req.params.id as string)
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const student: Student | null = await GetStudent_Info_About__Controller(id, schoolId)
    if (student === null) {
        res.status(404).send("Student not found")
    } else {
        res.json(student)
    }
})

// Update Student
v1Student.put('/info/:id', adminAuthorize, async (req, res) => {
    const id: number = parseInt(req.params.id as string)
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const student: Student = req.body
    update_Student__Controller(id, student)
    res.sendStatus(200)
})


// Bill for specific students
v1Student.get('/info/:id/bills', adminAuthorize, async (req, res) => {
    const id: number = parseInt(req.params.id as string)
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const bills = await fetch_Bill_Student__Controller(id)
    res.json(bills)
})


// Promote
v1Student.post('/promote', adminAuthorize, async (req, res) => {
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const staffId: number = parseInt(req.headers["x-id"] as string);
    const { student_id, class_id, session_id } = req.body
    const billId: number = await promote_Student__Controller(staffId, schoolId, student_id, class_id, session_id)
    res.json({ bill: billId })
})

export default v1Student;
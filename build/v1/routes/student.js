"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const student_1 = require("../interface/student");
const student_2 = require("../controller/student");
const bill_1 = require("../controller/bill");
const v1Student = (0, express_1.Router)();
// Inquiry Submission
v1Student.post('/draft', auth_1.adminAuthorize, async (req, res) => {
    const schoolId = parseInt(req.headers["x-school"]);
    const data = req.body;
    const serverData = await (0, student_2.ResgisterStudentController)(schoolId, data);
    res.json(serverData);
});
// Inqury List fetch, only admin can fetch
v1Student.get('/draft', auth_1.adminAuthorize, async (req, res) => {
    const schoolId = parseInt(req.headers["x-school"]);
    const serverData = await (0, student_2.FetchStudentController)(schoolId, student_1.StudentStatus.Draft);
    res.json(serverData);
});
// New Admission
v1Student.post('/admission', auth_1.adminAuthorize, async (req, res) => {
    const schoolId = parseInt(req.headers["x-school"]);
    const staffId = parseInt(req.headers["x-id"]);
    const data = req.body;
    const billId = await (0, student_2.AdmissionStudentController)(staffId, schoolId, data, data.class, data.session);
    res.json({ bill: billId });
});
// All students
v1Student.get('/', auth_1.adminAuthorize, async (req, res) => {
    const schoolId = parseInt(req.headers["x-school"]);
    const serverData = await (0, student_2.GetAllStudentController)(schoolId);
    res.json(serverData);
});
// Search students
v1Student.get('/search', auth_1.adminAuthorize, async (req, res) => {
    const q = req.query.q;
    const schoolId = parseInt(req.headers["x-school"]);
    const serverData = await (0, student_2.SearchStudentController)(schoolId, q);
    res.json(serverData);
});
// Find students
v1Student.get('/info/:id', auth_1.adminAuthorize, async (req, res) => {
    const id = parseInt(req.params.id);
    const schoolId = parseInt(req.headers["x-school"]);
    const student = await (0, student_2.GetStudent_Info_About__Controller)(id, schoolId);
    if (student === null) {
        res.status(404).send("Student not found");
    }
    else {
        res.json(student);
    }
});
// Update Student
v1Student.put('/info/:id', auth_1.adminAuthorize, async (req, res) => {
    const id = parseInt(req.params.id);
    const schoolId = parseInt(req.headers["x-school"]);
    const student = req.body;
    (0, student_2.update_Student__Controller)(id, student);
    res.sendStatus(200);
});
// Bill for specific students
v1Student.get('/info/:id/bills', auth_1.adminAuthorize, async (req, res) => {
    const id = parseInt(req.params.id);
    const schoolId = parseInt(req.headers["x-school"]);
    const bills = await (0, bill_1.fetch_Bill_Student__Controller)(id);
    res.json(bills);
});
// Promote
v1Student.post('/promote', auth_1.adminAuthorize, async (req, res) => {
    const schoolId = parseInt(req.headers["x-school"]);
    const staffId = parseInt(req.headers["x-id"]);
    const { student_id, class_id, session_id } = req.body;
    const billId = await (0, student_2.promote_Student__Controller)(staffId, schoolId, student_id, class_id, session_id);
    res.json({ bill: billId });
});
exports.default = v1Student;

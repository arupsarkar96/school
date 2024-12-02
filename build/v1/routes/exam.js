"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const exam_1 = require("../controller/exam");
const v1Exam = (0, express_1.Router)();
v1Exam.get('/all', auth_1.adminAuthorize, async (req, res) => {
    const schoolId = parseInt(req.headers["x-school"]);
    const exams = await (0, exam_1.getAllExams)(schoolId);
    res.json(exams);
});
v1Exam.get('/active', auth_1.teacherAuthorize, async (req, res) => {
    const schoolId = parseInt(req.headers["x-school"]);
    const exams = await (0, exam_1.getActiveExams)(schoolId);
    res.json(exams);
});
v1Exam.post('/', auth_1.adminAuthorize, async (req, res) => {
    const schoolId = parseInt(req.headers["x-school"]);
    const { name } = req.body;
    const d = await (0, exam_1.insertExamController)(schoolId, name);
    res.status(201).json({ examId: d, message: "Exam created" });
});
v1Exam.post('/marks', auth_1.teacherAuthorize, async (req, res) => {
    const schoolId = parseInt(req.headers["x-school"]);
    const data = req.body;
    (0, exam_1.insertMarksController)(data);
    res.sendStatus(200);
});
v1Exam.patch('/:id', auth_1.adminAuthorize, async (req, res) => {
    const id = req.params.id;
    const schoolId = parseInt(req.headers["x-school"]);
    const { status } = req.body;
    (0, exam_1.updateExamStatus)(schoolId, id, status);
    res.sendStatus(200);
});
exports.default = v1Exam;

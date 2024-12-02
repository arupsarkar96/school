"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const subject_1 = require("../service/subject");
const v1Subject = (0, express_1.Router)();
v1Subject.post('/:classId', auth_1.adminAuthorize, async (req, res) => {
    const classId = parseInt(req.params.classId);
    const schoolId = parseInt(req.headers["x-school"]);
    const { name } = req.body;
    const subjectId = await (0, subject_1.addClassSubject)(schoolId, classId, name);
    const subject = {
        subject_id: subjectId,
        subject_name: name,
        class_id: classId
    };
    res.json(subject);
});
v1Subject.delete('/:subjectId', auth_1.adminAuthorize, async (req, res) => {
    const subjectId = parseInt(req.params.subjectId);
    const schoolId = parseInt(req.headers["x-school"]);
    (0, subject_1.deleteSubject)(schoolId, subjectId);
    res.json({ "status": "ok" });
});
exports.default = v1Subject;

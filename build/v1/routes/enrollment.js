"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enrollment_1 = require("../service/enrollment");
const auth_1 = require("../middleware/auth");
const v1Enrollment = (0, express_1.Router)();
v1Enrollment.get('/:session/:classId', auth_1.teacherAuthorize, async (req, res) => {
    const { session, classId } = req.params;
    const data = await (0, enrollment_1.fetch_Enrollmets__Service)(parseInt(session), parseInt(classId));
    res.json(data);
});
exports.default = v1Enrollment;

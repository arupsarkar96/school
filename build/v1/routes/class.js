"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const class_1 = require("../controller/class");
const v1Class = (0, express_1.Router)();
v1Class.get('/', auth_1.teacherAuthorize, async (req, res) => {
    const schoolId = parseInt(req.headers["x-school"]);
    const classes = await (0, class_1.fetch_Class__Controller)(schoolId);
    res.json(classes);
});
// Get Complete class details
v1Class.get('/:classId', auth_1.teacherAuthorize, async (req, res) => {
    const schoolId = parseInt(req.headers["x-school"]);
    const classId = parseInt(req.params.classId);
    const classes = await (0, class_1.getClassCompleteDetails)(schoolId, classId);
    res.json(classes);
});
v1Class.post('/', auth_1.adminAuthorize, async (req, res) => {
    const schoolId = parseInt(req.headers["x-school"]);
    const { name } = req.body;
    const _class = await (0, class_1.createClass)(schoolId, name);
    res.json(_class);
});
exports.default = v1Class;

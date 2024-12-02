"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const sessions_1 = require("../service/sessions");
const v1Sessions = (0, express_1.Router)();
v1Sessions.get('/all', auth_1.adminAuthorize, async (req, res) => {
    const schoolId = req.headers["x-school"];
    const data = await (0, sessions_1.getAllSessions)(schoolId);
    res.json(data);
});
v1Sessions.get('/admission', auth_1.adminAuthorize, async (req, res) => {
    const schoolId = req.headers["x-school"];
    const data = await (0, sessions_1.getAdmissionSessions)(schoolId);
    res.json(data);
});
v1Sessions.get('/active', auth_1.teacherAuthorize, async (req, res) => {
    const schoolId = req.headers["x-school"];
    const data = await (0, sessions_1.getActiveSessions)(schoolId);
    res.json(data);
});
v1Sessions.post('/', auth_1.adminAuthorize, async (req, res) => {
    const schoolId = req.headers["x-school"];
    const { start, end } = req.body;
    const id = await (0, sessions_1.insertSession)(schoolId, start, end);
    res.json({ session_id: id, start: start, end: end, admission: 1, status: 1 });
});
v1Sessions.put('/:session', auth_1.adminAuthorize, async (req, res) => {
    const schoolId = req.headers["x-school"];
    const { session } = req.params;
    const { admission, status } = req.body;
    (0, sessions_1.updateSession)(schoolId, session, admission, status);
    res.send("OK");
});
exports.default = v1Sessions;

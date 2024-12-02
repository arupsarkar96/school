"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const staff_1 = require("../controller/staff");
const v1Staff = (0, express_1.Router)();
v1Staff.get('/', auth_1.adminAuthorize, async (req, res) => {
    const schoolId = parseInt(req.headers["x-school"]);
    const data = await (0, staff_1.getAllStaffController)(schoolId);
    res.json(data);
});
// Add new staff
v1Staff.post('/', auth_1.adminAuthorize, async (req, res) => {
    const schoolId = parseInt(req.headers["x-school"]);
    const data = req.body;
    const staffId = await (0, staff_1.insertStaffController)(schoolId, data);
    res.json({ staffId: staffId, message: "Staff data created" });
});
exports.default = v1Staff;

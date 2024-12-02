"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const dashboard_1 = require("../service/dashboard");
const v1Dashboard = (0, express_1.Router)();
v1Dashboard.get('/', auth_1.adminAuthorize, async (req, res) => {
    const schoolId = parseInt(req.headers["x-school"]);
    const data = await (0, dashboard_1.fetch_Dashboard__Service)(schoolId);
    res.json(data);
});
exports.default = v1Dashboard;

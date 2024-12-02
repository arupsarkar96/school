"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const school_1 = require("../service/school");
const v1School = (0, express_1.Router)();
v1School.get('/', auth_1.adminAuthorize, async (req, res) => {
    const schoolId = parseInt(req.headers["x-school"]);
    const school = await (0, school_1.fetch_school__service)(schoolId);
    if (school === null) {
        res.sendStatus(404);
    }
    else {
        res.json(school);
    }
});
v1School.put('/', auth_1.adminAuthorize, async (req, res) => {
    const schoolId = parseInt(req.headers["x-school"]);
    const school = req.body;
    (0, school_1.update_school__service)(schoolId, school);
    res.sendStatus(200);
});
exports.default = v1School;

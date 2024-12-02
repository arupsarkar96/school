"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const result_1 = require("../service/result");
const auth_1 = require("../middleware/auth");
const v1Result = (0, express_1.Router)();
v1Result.get('/:session/:classId/:exam', auth_1.adminAuthorize, async (req, res) => {
    const { session, classId, exam } = req.params;
    const results = await (0, result_1.getResultsService)(session, classId, exam);
    res.json(results);
});
exports.default = v1Result;

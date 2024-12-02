"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const fee_1 = require("../service/fee");
const v1Fee = (0, express_1.Router)();
v1Fee.put('/', auth_1.adminAuthorize, async (req, res) => {
    const schoolId = parseInt(req.headers["x-school"]);
    const data = req.body;
    (0, fee_1.updateFee)(data);
    res.sendStatus(200);
});
exports.default = v1Fee;

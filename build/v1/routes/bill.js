"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const bill_1 = require("../controller/bill");
const v1Bill = (0, express_1.Router)();
v1Bill.get('/:billId', auth_1.adminAuthorize, async (req, res) => {
    const schoolId = parseInt(req.headers["x-school"]);
    const billId = parseInt(req.params.billId);
    const response = await (0, bill_1.getBillById)(billId, schoolId);
    res.status(response.code).json(response.data);
});
v1Bill.get('/', auth_1.adminAuthorize, async (req, res) => {
    const schoolId = parseInt(req.headers["x-school"]);
    const response = await (0, bill_1.getBills)(schoolId);
    res.json(response);
});
v1Bill.post('/', auth_1.adminAuthorize, async (req, res) => {
    const schoolId = parseInt(req.headers["x-school"]);
    const staffId = parseInt(req.headers["x-id"]);
    const data = req.body;
    const billId = await (0, bill_1.createPOSBill)(schoolId, data.student_id, staffId, data.items);
    res.json({ bill: billId });
});
exports.default = v1Bill;

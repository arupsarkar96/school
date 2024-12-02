"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_1 = require("../controller/payment");
const auth_1 = require("../middleware/auth");
const v1Payment = (0, express_1.Router)();
v1Payment.post('/', auth_1.adminAuthorize, async (req, res) => {
    const schoolId = parseInt(req.headers["x-school"]);
    const data = req.body;
    const transactionId = await (0, payment_1.capturePayment)(schoolId, data);
    res.json({ transaction_id: transactionId });
});
exports.default = v1Payment;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capturePayment = void 0;
const payment_1 = require("../service/payment");
const bill_1 = require("./bill");
const capturePayment = async (schoolId, data) => {
    const transactionId = await (0, payment_1.createPayment)(schoolId, data);
    const type = data.type === "credit" ? "Paid" : "Refund";
    (0, bill_1.updateBillConfirmation)(data.bill_id, transactionId, type);
    return transactionId;
};
exports.capturePayment = capturePayment;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBillById = exports.getBills = exports.fetch_Bill_Student__Controller = exports.createAdmissionBill = exports.updateBillConfirmation = exports.createPOSBill = void 0;
const bill_1 = require("../service/bill");
const inventory_1 = require("./inventory");
const createPOSBill = async (schoolId, studentId, staffId, items) => {
    const totalAmount = items.reduce((sum, item) => {
        return sum + (item.price * item.count);
    }, 0);
    const billId = await (0, bill_1.createBill)(schoolId, studentId, staffId, totalAmount);
    const bill_items = [];
    items.forEach((item) => {
        bill_items.push([billId, item.name, item.count, item.count * item.price]);
    });
    (0, inventory_1.posSellUpdate_Inventory)(items);
    (0, bill_1.createBillItems)(bill_items);
    return billId;
};
exports.createPOSBill = createPOSBill;
const updateBillConfirmation = async (billId, transactionId, status) => {
    (0, bill_1.updateBill_confirm)(billId, transactionId, status);
};
exports.updateBillConfirmation = updateBillConfirmation;
const createAdmissionBill = async (schoolId, studentId, staffId, fee) => {
    const billId = await (0, bill_1.createBill)(schoolId, studentId, staffId, fee.admission);
    const bill_items = [[billId, "Admission fee", 1, fee.admission]];
    (0, bill_1.createBillItems)(bill_items);
    return billId;
};
exports.createAdmissionBill = createAdmissionBill;
const fetch_Bill_Student__Controller = async (student_id) => {
    return await (0, bill_1.fetch_Bill_Student__Service)(student_id);
};
exports.fetch_Bill_Student__Controller = fetch_Bill_Student__Controller;
const getBills = async (schoolId) => {
    return await (0, bill_1.fetchAllBills)(schoolId);
};
exports.getBills = getBills;
const getBillById = async (billId, schoolId) => {
    const bill = await (0, bill_1.fetchBill)(billId, schoolId);
    if (bill === null) {
        return { code: 404, data: "Bill not found" };
    }
    else {
        const items = await (0, bill_1.fetchBillItems)(billId);
        const d = {
            ...bill, items: items
        };
        const finalData = { code: 200, data: d };
        return finalData;
    }
};
exports.getBillById = getBillById;

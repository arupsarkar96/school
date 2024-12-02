"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.staff_Account_Create_SMS_Service = void 0;
const config_1 = __importDefault(require("../../config"));
const staff_Account_Create_SMS_Service = async (id, password, phone) => {
    const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${config_1.default.SMS_API_KEY}&route=dlt&sender_id=MESANT&message=174793&variables_values=${id}|${password}&flash=0&numbers=${phone}`;
    const network = await fetch(url);
    const body = await network.json();
    console.log(body);
};
exports.staff_Account_Create_SMS_Service = staff_Account_Create_SMS_Service;

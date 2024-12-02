"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const registration_1 = require("../controller/registration");
// Define rate limit rules
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 24 * 60 * 60 * 1000, // 1 day
    max: 1, // Limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later.", // Response message
});
const v1Registration = (0, express_1.Router)();
v1Registration.use(limiter);
v1Registration.post('/', async (req, res) => {
    const data = req.body;
    const response = await (0, registration_1.enrollSchoolAndAdmin)(data);
    res.status(200).json(response);
});
exports.default = v1Registration;

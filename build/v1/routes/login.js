"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const login_1 = require("../controller/login");
// 10 login request per hour
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000,
    max: 10,
    message: "Too many login attempts, please try again later.",
});
const v1LoginRouter = (0, express_1.Router)();
v1LoginRouter.use(limiter);
v1LoginRouter.post('/staff', async (req, res) => {
    const data = req.body;
    const response = await (0, login_1.loginStaff)(data);
    return res.status(response.code).send(response.data);
});
exports.default = v1LoginRouter;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const service_1 = require("../controller/service");
const v1Service = (0, express_1.Router)();
v1Service.post('/rollnumber', auth_1.adminAuthorize, (req, res) => {
    const session = parseInt(req.body.session);
    const schoolId = parseInt(req.headers["x-school"]);
    (0, service_1.generate_Roll__Controller)(schoolId, session);
    res.sendStatus(200);
});
exports.default = v1Service;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginStaff = void 0;
const password_1 = require("../../utils/password");
const token_1 = require("../../utils/token");
const staff_1 = require("../service/staff");
const loginStaff = async (data) => {
    const staffdata = await (0, staff_1.getStaffData)(data.id);
    if (staffdata === null) {
        return { code: 400, data: "Oops! We couldn't find a staff member with that ID." };
    }
    else {
        const match = await (0, password_1.comparePassword)(data.password, staffdata.staff_password);
        if (!match) {
            return { code: 400, data: "The password you entered is incorrect !" };
        }
        else {
            const token = (0, token_1.generateToken)({ id: staffdata.staff_id, role: staffdata.role, school: staffdata.school_id }, "1d");
            return { code: 200, data: { id: staffdata.staff_id, name: staffdata.staff_name, image: staffdata.staff_image, role: staffdata.role, token: token, school: staffdata.school_name } };
        }
    }
};
exports.loginStaff = loginStaff;

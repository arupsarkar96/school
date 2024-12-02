"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate_Roll__Controller = void 0;
const enrollment_1 = require("../service/enrollment");
const class_1 = require("./class");
const generate_Roll__Controller = async (school_id, session) => {
    const classes = await (0, class_1.fetch_Class__Controller)(school_id);
    classes.forEach(async (cls) => {
        const students = await (0, enrollment_1.fetch_Enrollmets__Service)(session, cls.class_id);
        console.log('Generating...', cls.class_name);
        students.forEach(async (student, index) => {
            const roll = index + 1;
            const enroll_id = student.enrollment_id;
            await (0, enrollment_1.update_Enrollment_Roll__Service)(roll, enroll_id);
            console.log(index + 1, student.student_name);
        });
        console.log('*****************************');
    });
};
exports.generate_Roll__Controller = generate_Roll__Controller;

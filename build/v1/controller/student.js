"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_Student__Controller = exports.GetStudent_Info_About__Controller = exports.SearchStudentController = exports.FetchStudentController = exports.AdmissionStudentController = exports.promote_Student__Controller = exports.ResgisterStudentController = exports.GetAllStudentController = void 0;
const student_1 = require("../interface/student");
const enrollment_1 = require("../service/enrollment");
const fee_1 = require("../service/fee");
const student_2 = require("../service/student");
const bill_1 = require("./bill");
const GetAllStudentController = async (schoolId) => {
    return await (0, student_2.GetAllStudentsService)(schoolId);
};
exports.GetAllStudentController = GetAllStudentController;
const ResgisterStudentController = async (schoolId, data) => {
    const studentId = await (0, student_2.RegisterStudent)(schoolId, data, student_1.StudentStatus.Draft);
    const student = {
        student_id: studentId,
        school_id: schoolId,
        student_name: data.student_name,
        dob: data.dob,
        parent_name: data.parent,
        phone: data.phone,
        photo: null,
        gender: data.gender,
        address: data.address,
        status: student_1.StudentStatus.Draft
    };
    return student;
};
exports.ResgisterStudentController = ResgisterStudentController;
const promote_Student__Controller = async (staffId, schoolId, studentId, classId, sessionId) => {
    const enrolled = await (0, enrollment_1.insertEnrollment)(sessionId, classId, studentId);
    if (enrolled) {
        (0, student_2.update_Student_Status__Service)(studentId, student_1.StudentStatus.Active);
        const fee = await (0, fee_1.getFee)(classId);
        const billingId = await (0, bill_1.createAdmissionBill)(schoolId, studentId, staffId, fee);
        return billingId;
    }
    else {
        return 0;
    }
};
exports.promote_Student__Controller = promote_Student__Controller;
const AdmissionStudentController = async (staffId, schoolId, data, classId, sessionId) => {
    const studentId = await (0, student_2.RegisterStudent)(schoolId, data, student_1.StudentStatus.Draft);
    const billingId = await (0, exports.promote_Student__Controller)(staffId, schoolId, studentId, classId, sessionId);
    return billingId;
};
exports.AdmissionStudentController = AdmissionStudentController;
const FetchStudentController = async (schoolId, status) => {
    return await (0, student_2.FetchStudents)(schoolId, status);
};
exports.FetchStudentController = FetchStudentController;
const SearchStudentController = async (schoolId, query) => {
    return await (0, student_2.SearchStudents)(schoolId, query);
};
exports.SearchStudentController = SearchStudentController;
const GetStudent_Info_About__Controller = async (student_id, schoolId) => {
    return (0, student_2.Get_Student_Info)(schoolId, student_id);
};
exports.GetStudent_Info_About__Controller = GetStudent_Info_About__Controller;
const update_Student__Controller = (student_id, data) => {
    (0, student_2.update_Student_Info__Service)(student_id, data);
};
exports.update_Student__Controller = update_Student__Controller;

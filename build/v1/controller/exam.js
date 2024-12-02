"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllExams = exports.getActiveExams = exports.insertExamController = exports.updateExamStatus = exports.insertMarksController = void 0;
const exam_1 = require("../service/exam");
const insertMarksController = (data) => {
    (0, exam_1.insertMarksData)(data);
};
exports.insertMarksController = insertMarksController;
const updateExamStatus = (schoolId, examId, status) => {
    (0, exam_1.updateExamStatusService)(schoolId, examId, status);
};
exports.updateExamStatus = updateExamStatus;
const insertExamController = async (schoolId, examName) => {
    const examId = await (0, exam_1.insertExamService)(schoolId, examName);
    return examId;
};
exports.insertExamController = insertExamController;
const getActiveExams = async (schoolId) => {
    return await (0, exam_1.getActiveExamService)(schoolId);
};
exports.getActiveExams = getActiveExams;
const getAllExams = async (schoolId) => {
    return await (0, exam_1.getAllExamService)(schoolId);
};
exports.getAllExams = getAllExams;

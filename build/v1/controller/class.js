"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClass = exports.fetch_Class__Controller = exports.getClassCompleteDetails = void 0;
const class_1 = require("../service/class");
const fee_1 = require("../service/fee");
const subject_1 = require("../service/subject");
const getClassCompleteDetails = async (schoolId, classId) => {
    const subjects = await (0, subject_1.getClassSubject)(schoolId, classId);
    const fee = await (0, fee_1.getFee)(classId);
    return { subjects: subjects, fee: fee };
};
exports.getClassCompleteDetails = getClassCompleteDetails;
const fetch_Class__Controller = async (schoolId) => {
    return await (0, class_1.getClasses)(schoolId);
};
exports.fetch_Class__Controller = fetch_Class__Controller;
const createClass = async (schoolId, name) => {
    const id = await (0, class_1.insertClass)(schoolId, name);
    (0, fee_1.defaultFeeGenerate)(id);
    const _class = { class_id: id, class_name: name, school_id: schoolId };
    return _class;
};
exports.createClass = createClass;

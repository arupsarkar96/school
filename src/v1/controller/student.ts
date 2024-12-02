
import { Fee } from "../interface/fee";
import { EnrollStudent, Student, StudentStatus } from "../interface/student";
import { insertEnrollment } from "../service/enrollment";
import { getFee } from "../service/fee";
import { FetchStudents, Get_Student_Info, GetAllStudentsService, RegisterStudent, SearchStudents, update_Student_Info__Service, update_Student_Status__Service } from "../service/student";
import { createAdmissionBill } from "./bill";



export const GetAllStudentController = async (schoolId: number): Promise<Student[]> => {
    return await GetAllStudentsService(schoolId)
}

export const ResgisterStudentController = async (schoolId: number, data: EnrollStudent): Promise<Student> => {
    const studentId: number = await RegisterStudent(schoolId, data, StudentStatus.Draft)
    const student: Student = {
        student_id: studentId,
        school_id: schoolId,
        student_name: data.student_name,
        dob: data.dob,
        parent_name: data.parent,
        phone: data.phone,
        photo: null,
        gender: data.gender,
        address: data.address,
        status: StudentStatus.Draft
    }
    return student;
}

export const promote_Student__Controller = async (staffId: number, schoolId: number, studentId: number, classId: number, sessionId: number): Promise<number> => {
    const enrolled: boolean = await insertEnrollment(sessionId, classId, studentId)
    if (enrolled) {
        update_Student_Status__Service(studentId, StudentStatus.Active)
        const fee: Fee = await getFee(classId)
        const billingId: number = await createAdmissionBill(schoolId, studentId, staffId, fee)
        return billingId;
    } else {
        return 0
    }
}

export const AdmissionStudentController = async (staffId: number, schoolId: number, data: EnrollStudent, classId: number, sessionId: number): Promise<number> => {
    const studentId: number = await RegisterStudent(schoolId, data, StudentStatus.Draft)
    const billingId: number = await promote_Student__Controller(staffId, schoolId, studentId, classId, sessionId)
    return billingId;
}

export const FetchStudentController = async (schoolId: number, status: StudentStatus): Promise<Student[]> => {
    return await FetchStudents(schoolId, status)
}

export const SearchStudentController = async (schoolId: number, query: string): Promise<Student[]> => {
    return await SearchStudents(schoolId, query)
}

export const GetStudent_Info_About__Controller = async (student_id: number, schoolId: number): Promise<Student | null> => {
    return Get_Student_Info(schoolId, student_id)
}

export const update_Student__Controller = (student_id: number, data: Student) => {
    update_Student_Info__Service(student_id, data)
}
import { Class } from "../interface/class";
import { EnrollmentWithStudent } from "../interface/enrollment";
import { fetch_Enrollmets__Service, update_Enrollment_Roll__Service } from "../service/enrollment";
import { fetch_Class__Controller } from "./class";


export const generate_Roll__Controller = async (school_id: number, session: number) => {

    const classes: Class[] = await fetch_Class__Controller(school_id)

    classes.forEach(async (cls) => {
        const students: EnrollmentWithStudent[] = await fetch_Enrollmets__Service(session, cls.class_id)
        console.log('Generating...', cls.class_name)

        students.forEach(async (student, index) => {
            const roll = index + 1
            const enroll_id = student.enrollment_id
            await update_Enrollment_Roll__Service(roll, enroll_id)
            console.log(index + 1, student.student_name)
        })
        console.log('*****************************')
    })
}
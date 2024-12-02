import { Student } from "./student";

export interface Enrollment {
    enrollment_id: number,
    class_id: number,
    session_id: number,
    student_id: number,
    roll_number: number
}


export interface EnrollmentWithStudent extends Student, Enrollment {

}
import { Request, Response } from "express";
import { fetch_staff__service } from "../services/staff-service";
import { comparePassword } from "../utils/password";
import { generateToken } from "../utils/token";
import { fetch_school__service } from "../services/school-service";
import { fetch_student__service } from "../services/student-service";
import { fetch_active_enrollment__service } from "../services/enrollment-service";



export const studentLogin = async (req: Request, res: Response): Promise<void> => {

    const { id, password } = req.body

    if (!id || !password) {
        res.status(401).json({
            status: "error",
            message: "ID and Password required"
        })
        return
    }

    const student = await fetch_student__service(id)

    if (student == null) {
        res.status(401).json({
            status: "error",
            message: "Student ID not found"
        })
        return
    }

    const match = await comparePassword(password, student.password)

    if (!match) {
        res.status(401).json({
            status: "error",
            message: "Wrong password"
        })
        return
    }

    const school = await fetch_school__service(student.school_id)
    const enrollment = await fetch_active_enrollment__service(student.student_id)


    if (typeof enrollment != "number") {
        const token = generateToken({ id: student.student_id, role: "student", school: student.school_id, course: enrollment?.course_id, session: enrollment?.session_id }, "1y")


        res.status(200).json({
            user: {
                id: student.student_id,
                name: student.student_name,
                photo: student.photo,
                role: "student"
            },
            school: {
                id: school?.school_id,
                name: school?.school_name
            },
            token: token,
            course: {
                roll: enrollment?.roll,
                course_name: enrollment?.course_name,
                session: enrollment?.session_id,
                course_id: enrollment?.course_id
            }
        })
    }
}

export const staffLogin = async (req: Request, res: Response): Promise<void> => {

    console.log(req.body)
    const { id, password } = req.body

    if (!id || !password) {
        res.status(401).json({
            status: "error",
            message: "ID and Password required"
        })
        return
    }


    const staff = await fetch_staff__service(id)

    if (staff == null) {
        res.status(401).json({
            status: "error",
            message: "STAFF ID not found"
        })
        return
    }

    const match = await comparePassword(password, staff.staff_password)

    if (!match) {
        res.status(401).json({
            status: "error",
            message: "Wrong password"
        })
        return
    }


    const token = generateToken({ id: staff.staff_id, role: staff.role, school: staff.school_id }, "1y")

    const school = await fetch_school__service(staff.school_id)

    res.status(200).json({
        user: {
            id: staff.staff_id,
            name: staff.staff_name,
            role: staff.role,
            photo: staff.staff_image
        },
        school: {
            id: school?.school_id,
            name: school?.school_name
        },
        token: token
    })


}
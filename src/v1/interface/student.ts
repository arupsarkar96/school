export interface EnrollStudent {
    student_name: string,
    parent: string,
    dob: string,
    phone: string,
    address: string,
    gender: string
}

export interface AdmissionEnrollStudent {
    student_name: string,
    parent: string,
    dob: string,
    phone: string,
    address: string,
    gender: string,
    class: number,
    session: number
}

export enum StudentStatus {
    Draft = "draft",
    Active = "active",
    Transferred = "transferred"
}

export interface Student {
    student_id: number,
    school_id: number,
    student_name: string,
    phone: string,
    gender: string,
    dob: string,
    address: string,
    photo: string | null,
    parent_name: string,
    status: StudentStatus
}
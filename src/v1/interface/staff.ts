import { School } from "./school";

export interface Staff {
    staff_id: number,
    school_id: number,
    staff_name: string,
    staff_phone: string,
    staff_email: string,
    staff_password: string,
    staff_image: string,
    staff_gender: string,
    role: string,
    hire_date: string,
    salary: number,
    bank_name: string,
    account_no: string,
    ifsc_code: string
}

export interface StaffWithSchool extends School, Staff {

}
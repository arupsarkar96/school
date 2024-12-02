import { School } from "./school";
import { Student } from "./student";

export interface Bill {
    bill_id: number,
    student_id: number,
    staff_id: number,
    bill_amount: number,
    bill_date: string,
    bill_status: BillStatus
}

export enum BillStatus {
    Paid = "Paid",
    UnPaid = "Unpaid",
    Refund = "Refund"
}

export interface BillItem {
    id: number,
    bill_id: number,
    description: string,
    quantity: number,
    amount: number
}

export interface PreBillItem {
    bill_id: number,
    description: string,
    quantity: number,
    amount: number
}

export interface BillWithStudent extends Bill, Student {

}

export interface BillWithStudentAndSchool extends Bill, Student, School {

}

export interface BillDetails extends BillWithStudentAndSchool {
    items: BillItem[]
}


export interface FetchBillSuccess {
    code: 200,
    data: BillDetails;
}

interface FetchBillError {
    code: 404,
    data: string;
}

// Union type for the return value
export type FetchBillResponse = FetchBillSuccess | FetchBillError;

export interface PosBillEnroll {
    student_id: number,
    items: PosBillItem[]
}

export interface PosBillItem {
    id: number,
    name: string,
    price: number,
    count: number
}
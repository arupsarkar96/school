import { BillStatus } from "./bill";

export interface PaymentEnroll {
    bill_id: number,
    mode: string,
    amount: number,
    type: PaymentStatus | BillStatus,
    description: string
}

export enum PaymentStatus {
    Credit = "credit",
    Debit = "debit",
    Refund = "refund"
}
import { Request, Response } from "express";
import { fetch_all_bill__service, fetch_bill__service, fetch_bill_items__service, pay_bill__service } from "../services/bill-service";
import { fetch_school__service } from "../services/school-service";
import { create_payment__service } from "../services/payment-service";


export const fetchAllBills = async (req: Request, res: Response) => {
    const schoolId: string = req.headers["x-school"] as string
    const page: number = parseInt(req.query.page as string) || 0
    const bills = await fetch_all_bill__service(schoolId, page)
    res.status(200).json({
        invoices: bills,
        next: bills.length == 10 ? page + 1 : 0
    })
}

export const fetchBill = async (req: Request, res: Response) => {
    const schoolId: string = req.headers["x-school"] as string
    const bill: number = parseInt(req.params.id)

    const bills = await fetch_bill__service(schoolId, bill)


    if (bills != null) {
        const items = await fetch_bill_items__service(bill)
        const school = await fetch_school__service(schoolId)

        res.status(200).json({
            school: school,
            invoice: bills,
            details: items
        })
    } else {
        res.status(404).json({
            status: "error",
            message: "Bill not found"
        })
    }
}

export const updateBill = async (req: Request, res: Response) => {
    const schoolId: string = req.headers["x-school"] as string
    const bill: number = parseInt(req.params.id)
    const staffId: string = req.headers["x-id"] as string

    const bills = await fetch_bill__service(schoolId, bill)


    if (bills != null) {
        const payment = await create_payment__service(bill, schoolId, staffId, bills.total, "CASH")
        const update = await pay_bill__service(bill)

        res.status(200).json({
            status: "success",
            message: "Invoice updated"
        })
    } else {
        res.status(404).json({
            status: "error",
            message: "Bill not found"
        })
    }
}

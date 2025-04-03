import { Request, Response } from "express";
import { fetch_payment__service } from "../services/payment-service";


export const getPayments = async (req: Request, res: Response): Promise<void> => {
    const schoolId: string = req.headers["x-school"] as string;
    const staffId: string = req.headers["x-id"] as string;
    const page: number = parseInt(req.query.page as string) | 0

    const expenses = await fetch_payment__service(schoolId, page)

    res.status(200).json({
        logs: expenses,
        next: expenses.length == 10 ? page + 1 : 0
    })
}


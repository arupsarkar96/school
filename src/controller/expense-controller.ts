import { Request, Response } from "express";
import { create_expense__service, fetch_expense__service } from "../services/expense-service";


export const getExpenses = async (req: Request, res: Response): Promise<void> => {
    const schoolId: string = req.headers["x-school"] as string;
    const staffId: string = req.headers["x-id"] as string;
    const page: number = parseInt(req.query.page as string) | 0

    const expenses = await fetch_expense__service(schoolId, page)

    res.status(200).json({
        logs: expenses,
        next: expenses.length == 10 ? page + 1 : 0
    })
}

export const createExpense = async (req: Request, res: Response): Promise<void> => {
    const schoolId: string = req.headers["x-school"] as string;
    const staffId: string = req.headers["x-id"] as string;
    const { bill, note, amount } = req.body

    const expenses = await create_expense__service(schoolId, bill, note, amount)

    if (expenses) {
        res.status(201).json({
            status: "success",
            message: "Expense created successfully !"
        })
    } else {
        res.status(400).json({
            status: "error",
            message: "Expense create failed !"
        })
    }
}
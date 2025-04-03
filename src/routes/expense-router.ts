import { Router } from "express";
import { adminAuthorize } from "../middleware/auth";
import { getExpenses, createExpense } from "../controller/expense-controller";

const expenseRouter = Router()

expenseRouter.get("/", adminAuthorize, getExpenses)
expenseRouter.post("/", adminAuthorize, createExpense)

export default expenseRouter;
import { Router } from "express";
import { adminAuthorize } from "../middleware/auth";
import { getPayments } from "../controller/payment-controller";

const paymentRouter = Router()

paymentRouter.get("/", adminAuthorize, getPayments)

export default paymentRouter
import { Router } from "express";
import { PaymentEnroll } from "../interface/payment";
import { capturePayment } from "../controller/payment";
import { adminAuthorize } from "../middleware/auth";


const v1Payment = Router();

v1Payment.post('/', adminAuthorize, async (req, res) => {
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const data: PaymentEnroll = req.body
    const transactionId = await capturePayment(schoolId, data)
    res.json({ transaction_id: transactionId })
})



export default v1Payment;
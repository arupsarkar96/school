import { PaymentEnroll } from "../interface/payment";
import { createPayment } from "../service/payment";
import { updateBillConfirmation } from "./bill";


export const capturePayment = async (schoolId: number, data: PaymentEnroll): Promise<string> => {
    const transactionId: string = await createPayment(schoolId, data)
    const type = data.type === "credit" ? "Paid" : "Refund"
    updateBillConfirmation(data.bill_id, transactionId, type)

    return transactionId
}
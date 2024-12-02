import { Router } from "express";
import { adminAuthorize } from "../middleware/auth";
import { createPOSBill, getBillById, getBills } from "../controller/bill";
import { PosBillEnroll } from "../interface/bill";

const v1Bill = Router();


v1Bill.get('/:billId', adminAuthorize, async (req, res) => {
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const billId: number = parseInt(req.params.billId as string)
    const response = await getBillById(billId, schoolId)
    res.status(response.code).json(response.data)
})

v1Bill.get('/', adminAuthorize, async (req, res) => {
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const response = await getBills(schoolId)
    res.json(response)
})

v1Bill.post('/', adminAuthorize, async (req, res) => {
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const staffId: number = parseInt(req.headers["x-id"] as string);
    const data: PosBillEnroll = req.body
    const billId = await createPOSBill(schoolId, data.student_id, staffId, data.items)
    res.json({ bill: billId })
})


export default v1Bill;


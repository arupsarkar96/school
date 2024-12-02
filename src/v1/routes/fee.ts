import { Router } from "express";
import { adminAuthorize } from "../middleware/auth";
import { Fee } from "../interface/fee";
import { updateFee } from "../service/fee";

const v1Fee = Router();

v1Fee.put('/', adminAuthorize, async (req, res) => {
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const data: Fee = req.body
    updateFee(data)
    res.sendStatus(200)
})

export default v1Fee;
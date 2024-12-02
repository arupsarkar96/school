import { Router } from "express";
import { adminAuthorize } from "../middleware/auth";
import { generate_Roll__Controller } from "../controller/service";

const v1Service = Router();

v1Service.post('/rollnumber', adminAuthorize, (req, res) => {
    const session: number = parseInt(req.body.session)
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    generate_Roll__Controller(schoolId, session)
    res.sendStatus(200)
})

export default v1Service;
import { Router } from "express";
import rateLimit from 'express-rate-limit';
import { StaffLogin, StaffLoginResponse } from "../interface/login";
import { loginStaff } from "../controller/login";

// 10 login request per hour
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10,
    message: "Too many login attempts, please try again later.",
});


const v1LoginRouter = Router();

v1LoginRouter.use(limiter)

v1LoginRouter.post('/staff', async (req, res) => {
    const data: StaffLogin = req.body
    const response: StaffLoginResponse = await loginStaff(data)
    return res.status(response.code).send(response.data);
})

export default v1LoginRouter;
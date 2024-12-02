import { Router } from "express";
import rateLimit from 'express-rate-limit';
import { RegistrationSuccess, SchoolEnroll } from "../interface/registration";
import { enrollSchoolAndAdmin } from "../controller/registration";

// Define rate limit rules
const limiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 1 day
    max: 1, // Limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later.", // Response message
});


const v1Registration = Router();
v1Registration.use(limiter)

v1Registration.post('/', async (req, res) => {
    const data: SchoolEnroll = req.body
    const response: RegistrationSuccess = await enrollSchoolAndAdmin(data)
    res.status(200).json(response)
})

export default v1Registration;
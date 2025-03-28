
import { Router } from "express";
import { staffLogin, studentLogin } from "../controller/login-controller";

const loginRoute = Router()

loginRoute.post("/staff", staffLogin)
loginRoute.post("/student", studentLogin)

export default loginRoute;
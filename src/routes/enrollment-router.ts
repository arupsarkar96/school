import { Router } from "express";
import { adminAndStaffAuthorize } from "../middleware/auth";
import { createEnrollment } from "../controller/enrollment-controller";

const enrollmentRouter = Router()

enrollmentRouter.post("/", adminAndStaffAuthorize, createEnrollment)

export default enrollmentRouter;


import { Router } from "express";
import { createSchool } from "../controller/school-controller";
import { createStaff, fetchStaffs } from "../controller/staff-controller";
import { adminAuthorize } from "../middleware/auth";

const userRouter = Router()

userRouter.post("/", adminAuthorize, createStaff)
userRouter.get("/", adminAuthorize, fetchStaffs)

export default userRouter;


import { Router } from "express";
import { createSchool } from "../controller/school-controller";

const schoolRouter = Router()

schoolRouter.post("/", createSchool)


export default schoolRouter;
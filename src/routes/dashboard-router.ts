import { Router } from "express";
import { adminAuthorize } from "../middleware/auth";
import { fetchDashboard } from "../controller/dashboard-controller";

const dashboardRouter = Router()

dashboardRouter.get("/admin", adminAuthorize, fetchDashboard)

export default dashboardRouter;
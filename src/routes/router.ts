import { Router } from "express";
import schoolRouter from "./school-route";
import userRouter from "./staff-route";
import sessionRoute from "./session-route";
import loginRoute from "./login-route";
import studentRoute from "./student-route";
import enrollmentRouter from "./enrollment-router";
import classRouter from "./class-router";
import inventoryRouter from "./inventory-router";
import notesRouter from "./notes-router";
import billRouter from "./bill-router";
import posRouter from "./pos-router";
import dashboardRouter from "./dashboard-router";

const router = Router()

router.use("/school", schoolRouter)
router.use("/staffs", userRouter)
router.use("/session", sessionRoute)
router.use("/login", loginRoute)
router.use("/student", studentRoute)
router.use("/enrollment", enrollmentRouter)
router.use("/class", classRouter)
router.use("/inventory", inventoryRouter)
router.use("/notes", notesRouter)
router.use("/invoices", billRouter)
router.use("/cart", posRouter)
router.use("/dashboard", dashboardRouter)

export default router;
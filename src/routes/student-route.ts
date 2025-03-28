import { Router } from "express";
import { adminAndStaffAuthorize, authorizeAll } from "../middleware/auth";
import { createStudent, fetchStudentInvoices } from "../controller/student-controller";

const studentRoute = Router();


// Create student
studentRoute.post("/", adminAndStaffAuthorize, createStudent)
// studentRoute.get("/:id/info", adminAndStaffAuthorize, createStudent)
studentRoute.get("/:id/receipts", authorizeAll, fetchStudentInvoices)
// studentRoute.get("/:id/info", adminAndStaffAuthorize, createStudent)


export default studentRoute;
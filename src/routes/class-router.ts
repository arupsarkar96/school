import { Router } from "express";
import { adminAndStaffAuthorize, adminAuthorize } from "../middleware/auth";
import { createClass, createSubject, deleteSubject, fetchAllClass, fetchClassWithFees, fetchClassWithSubjects, fetchStudents, updateClassFees } from "../controller/class-controller";

const classRouter = Router();

classRouter.post("/", adminAuthorize, createClass)

classRouter.get("/", adminAndStaffAuthorize, fetchAllClass)

classRouter.get("/:id/fees", adminAndStaffAuthorize, fetchClassWithFees)

classRouter.put("/:id/fees", adminAndStaffAuthorize, updateClassFees)

classRouter.get("/:id/subjects", adminAndStaffAuthorize, fetchClassWithSubjects)

classRouter.delete("/:id/subject/:subjectId", adminAndStaffAuthorize, deleteSubject)

classRouter.post("/:id/subjects", adminAndStaffAuthorize, createSubject)

classRouter.get("/:id/students", adminAndStaffAuthorize, fetchStudents)




export default classRouter;
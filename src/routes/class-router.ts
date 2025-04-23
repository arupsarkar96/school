import { Router } from "express";
import { adminAndStaffAuthorize, adminAuthorize } from "../middleware/auth";
import { createClass, createSubject, deleteSubject, fetchAllClass, fetchClassWithFees, fetchClassWithSubjects, fetchStudents, updateClassFees } from "../controller/class-controller";
import { fetchNotesByCourse } from "../controller/notes-controller";

const classRouter = Router();

classRouter.post("/", adminAuthorize, createClass)

classRouter.get("/", adminAndStaffAuthorize, fetchAllClass)

classRouter.get("/:id/fees", adminAndStaffAuthorize, fetchClassWithFees)

classRouter.put("/:id/fees", adminAndStaffAuthorize, updateClassFees)

classRouter.get("/:id/subjects", adminAndStaffAuthorize, fetchClassWithSubjects)

classRouter.delete("/:id/subject/:subjectId", adminAndStaffAuthorize, deleteSubject)

classRouter.post("/:id/subjects", adminAndStaffAuthorize, createSubject)

classRouter.get("/:id/students", adminAndStaffAuthorize, fetchStudents)

classRouter.get("/:id/notes", adminAndStaffAuthorize, fetchNotesByCourse)



export default classRouter;
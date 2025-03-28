import { Router } from "express";
import { studentAuthorize, teacherAuthorize } from "../middleware/auth";
import { createTeacherNotes, fetchNotes, fetchTeacherNotes } from "../controller/notes-controller";


const notesRouter = Router()

notesRouter.get("/:course/:session", fetchNotes)
notesRouter.get("/", teacherAuthorize, fetchTeacherNotes)
notesRouter.post("/", teacherAuthorize, createTeacherNotes)

export default notesRouter;
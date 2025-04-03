import { Router } from "express";
import { studentAuthorize, teacherAuthorize } from "../middleware/auth";
import { createTeacherNotes, deleteTeacherNotes, editTeacherNotes, fetchNotes, fetchTeacherNotes } from "../controller/notes-controller";


const notesRouter = Router()

notesRouter.get("/:course/:session", fetchNotes)
notesRouter.get("/", teacherAuthorize, fetchTeacherNotes)
notesRouter.post("/", teacherAuthorize, createTeacherNotes)
notesRouter.put("/:id", teacherAuthorize, editTeacherNotes)
notesRouter.delete("/:id", teacherAuthorize, deleteTeacherNotes)

export default notesRouter;
import { Request, Response } from "express";
import { create_teacher_notes__service, delete_teacher_notes__service, edit_teacher_notes__service, fetch_notes__service, fetch_teacher_notes__service } from "../services/notes-service";


export const fetchNotes = async (req: Request, res: Response): Promise<void> => {

    const courseId: number = parseInt(req.params.course)
    const sessionId: number = parseInt(req.params.session)
    const page: number = parseInt(req.query.page as string) || 0

    const notes = await fetch_notes__service(courseId, sessionId, page)

    res.status(200).json({
        notes: notes,
        next: notes.length == 10 ? page + 1 : 0
    })
}

export const fetchTeacherNotes = async (req: Request, res: Response): Promise<void> => {
    const userId: string = req.headers["x-id"] as string;
    const page: number = parseInt(req.query.page as string) || 0

    const notes = await fetch_teacher_notes__service(userId, page)

    res.status(200).json({
        notes: notes,
        next: notes.length == 10 ? page + 1 : 0
    })
}

export const createTeacherNotes = async (req: Request, res: Response): Promise<void> => {
    const userId: string = req.headers["x-id"] as string;
    const schoolId: string = req.headers["x-school"] as string;
    const { course, subject, content } = req.body


    const notes = await create_teacher_notes__service(schoolId, course, subject, userId, content)

    if (notes) {
        res.status(201).json({
            status: "success",
            message: "Note created successfully"
        })
    } else {
        res.status(400).json({
            status: "error",
            message: "Try again"
        })
    }
}

export const deleteTeacherNotes = async (req: Request, res: Response): Promise<void> => {
    const userId: string = req.headers["x-id"] as string;
    const schoolId: string = req.headers["x-school"] as string;
    const noteId: number = parseInt(req.params.id)

    const notes = await delete_teacher_notes__service(schoolId, userId, noteId)

    if (notes) {
        res.status(200).json({
            status: "success",
            message: "Note deleted successfully"
        })
    } else {
        res.status(400).json({
            status: "error",
            message: "Note delete failed"
        })
    }
}

export const editTeacherNotes = async (req: Request, res: Response): Promise<void> => {
    const userId: string = req.headers["x-id"] as string;
    const schoolId: string = req.headers["x-school"] as string;
    const noteId: number = parseInt(req.params.id)
    const { course, subject, content } = req.body


    const notes = await edit_teacher_notes__service(content, schoolId, userId, noteId)

    if (notes) {
        res.status(200).json({
            status: "success",
            message: "Note updated successfully"
        })
    } else {
        res.status(400).json({
            status: "error",
            message: "Note update failed"
        })
    }
}
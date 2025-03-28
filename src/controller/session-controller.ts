import { Request, Response } from "express";
import { create_session__service, fetch_all_session__service } from "../services/session-service";


export const fetchAllSession = async (req: Request, res: Response): Promise<void> => {
    const schoolId: string = req.headers["x-school"] as string;
    const sessions = await fetch_all_session__service(schoolId)
    res.status(200).json({ sessions: sessions })
}

export const createSession = async (req: Request, res: Response): Promise<void> => {
    const schoolId: string = req.headers["x-school"] as string;
    const { start, end } = req.body
    const session = await create_session__service(schoolId, start, end);

    if (session != null) {
        res.status(201).json({
            status: "success",
            message: "session created"
        })
    } else {
        res.json({
            status: "error",
            message: "Try again"
        })
    }
}
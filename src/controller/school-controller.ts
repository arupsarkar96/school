import { Request, Response } from 'express';
import { school_registration__service } from '../services/school-service';


export const createSchool = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body

    const school = await school_registration__service(name)

    if (school === null) {
        res.status(400).json({
            status: "error",
            message: "School creation failed. Try after few minutes"
        })
    } else {
        res.status(200).json({
            status: "success",
            message: "School created successfully",
            data: {
                id: school,
                name: name
            }
        })
    }
}
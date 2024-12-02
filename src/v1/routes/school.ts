import { Router } from "express";
import { adminAuthorize } from "../middleware/auth";
import { fetch_school__service, update_school__service } from "../service/school";
import { School } from "../interface/school";

const v1School = Router();

v1School.get('/', adminAuthorize, async (req, res) => {
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const school = await fetch_school__service(schoolId)

    if (school === null) {
        res.sendStatus(404)
    } else {
        res.json(school)
    }
})

v1School.put('/', adminAuthorize, async (req, res) => {
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const school: School = req.body
    update_school__service(schoolId, school)
    res.sendStatus(200)
})

export default v1School;
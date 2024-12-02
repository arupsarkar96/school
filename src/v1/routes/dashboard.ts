import { Router } from "express";
import { adminAuthorize } from "../middleware/auth";
import { fetch_Dashboard__Service } from "../service/dashboard";

const v1Dashboard = Router();

v1Dashboard.get('/', adminAuthorize, async (req, res) => {
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const data = await fetch_Dashboard__Service(schoolId)
    res.json(data)
})

export default v1Dashboard;
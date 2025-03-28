import { Request, Response } from "express";
import { fetch_dashboard_payment__service, fetch_dashboard_users__service } from "../services/dashboard-service";

export const fetchDashboard = async (req: Request, res: Response): Promise<void> => {
    const schoolId: string = req.headers["x-school"] as string;
    const earnings: any = await fetch_dashboard_payment__service(schoolId)
    const users: any = await fetch_dashboard_users__service(schoolId)

    console.log(earnings)


    res.status(200).json({
        earning: {
            today: earnings[0][0].today == null ? 0 : earnings[0][0].today,
            month: earnings[1][0].month == null ? 0 : earnings[1][0].month
        },
        users: {
            students: users[0][0].students == null ? 0 : users[0][0].students,
            staffs: users[1][0].staffs == null ? 0 : users[1][0].staffs
        }
    })
}


import { Router } from "express";
import { adminAndStaffAuthorize, authorizeAll } from "../middleware/auth";
import { fetchAllBills, fetchBill, updateBill } from "../controller/bill-controller";

const billRouter = Router()

billRouter.get("/", adminAndStaffAuthorize, fetchAllBills)
billRouter.get("/:id", authorizeAll, fetchBill)
billRouter.patch("/:id", adminAndStaffAuthorize, updateBill)

export default billRouter
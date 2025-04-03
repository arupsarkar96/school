import { Router } from "express";
import { adminAndStaffAuthorize, adminAuthorize } from "../middleware/auth";
import { createInventoryItem, fetchInventoryItemLogs, fetchInventoryItems, updateInventoryItem } from "../controller/inventory-controller";


const inventoryRouter = Router()

inventoryRouter.post("/", adminAndStaffAuthorize, createInventoryItem)
inventoryRouter.get("/", adminAndStaffAuthorize, fetchInventoryItems)
inventoryRouter.put("/:id", adminAuthorize, updateInventoryItem)
inventoryRouter.get("/:id/logs", adminAndStaffAuthorize, fetchInventoryItemLogs)

export default inventoryRouter;
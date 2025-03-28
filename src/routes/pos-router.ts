import { Router } from "express";
import { adminAndStaffAuthorize } from "../middleware/auth";
import { checkOutCart, createItemInCart, createPosCart, deleteItemInCart, fetchCart, updateItemInCart } from "../controller/pos-controller";

const posRouter = Router()

posRouter.post("/", adminAndStaffAuthorize, createPosCart)
posRouter.get("/:id", adminAndStaffAuthorize, fetchCart)
posRouter.post("/:id", adminAndStaffAuthorize, createItemInCart)
posRouter.delete("/:id/:product", adminAndStaffAuthorize, deleteItemInCart)
posRouter.put("/:id", adminAndStaffAuthorize, updateItemInCart)
posRouter.post("/:id/checkout", adminAndStaffAuthorize, checkOutCart)

export default posRouter
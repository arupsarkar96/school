import { Request, Response } from "express";
import { fetch_inventory__service, fetch_product_log__service, insert_inventory__service, update_inventory__service } from "../services/inventory-service";


export const createInventoryItem = async (req: Request, res: Response): Promise<void> => {
    const schoolId: string = req.headers["x-school"] as string;
    const staffId: string = req.headers["x-id"] as string;

    const { code, name, price, quantity } = req.body
    const craete = await insert_inventory__service(schoolId, code, name, price, quantity, staffId)

    if (craete) {
        res.status(201).json({
            status: "success",
            message: "Item added successfully"
        })
    } else {
        res.status(400).json({
            status: "error",
            message: "Item already added"
        })
    }
}

export const fetchInventoryItems = async (req: Request, res: Response): Promise<void> => {
    const schoolId: string = req.headers["x-school"] as string;
    const page: number = parseInt(req.query.page as string) || 0

    const items = await fetch_inventory__service(schoolId, page)

    res.status(200).json({
        items: items,
        next: items.length == 10 ? page + 1 : 0
    })
}

export const updateInventoryItem = async (req: Request, res: Response): Promise<void> => {
    const schoolId: string = req.headers["x-school"] as string;
    const staffId: string = req.headers["x-id"] as string;

    const id = req.params.id
    const { name, price, quantity } = req.body
    update_inventory__service(id, name, price, quantity, staffId)
    res.status(200).json({
        status: "success",
        message: "Item updated successfully"
    })
}

export const fetchInventoryItemLogs = async (req: Request, res: Response): Promise<void> => {
    const productId: number = parseInt(req.params.id)
    const page: number = parseInt(req.query.page as string) | 0
    const logs = await fetch_product_log__service(productId, page)

    res.status(200).json({
        logs: logs,
        next: logs.length == 10 ? page + 1 : 0
    })
}
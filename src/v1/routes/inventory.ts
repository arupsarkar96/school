import { Router } from "express";
import { adminAuthorize } from "../middleware/auth";
import { fetchInventories, insert_inventory__Controller, update_inventory__controller } from "../controller/inventory";
import { Inventory } from "../interface/inventory";


const v1Inventory = Router();

v1Inventory.get('/', adminAuthorize, async (req, res) => {
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const data = await fetchInventories(schoolId)
    res.json(data)
})


v1Inventory.put('/', adminAuthorize, async (req, res) => {
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const inventory: Inventory = req.body
    update_inventory__controller(inventory)
    res.sendStatus(200)
})

v1Inventory.post('/', adminAuthorize, async (req, res) => {
    const schoolId: number = parseInt(req.headers["x-school"] as string);
    const inventory: Inventory = req.body
    insert_inventory__Controller({ ...inventory, school_id: schoolId, item_id: 0 })
    res.sendStatus(200)
})


export default v1Inventory;
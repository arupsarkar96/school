"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const inventory_1 = require("../controller/inventory");
const v1Inventory = (0, express_1.Router)();
v1Inventory.get('/', auth_1.adminAuthorize, async (req, res) => {
    const schoolId = parseInt(req.headers["x-school"]);
    const data = await (0, inventory_1.fetchInventories)(schoolId);
    res.json(data);
});
v1Inventory.put('/', auth_1.adminAuthorize, async (req, res) => {
    const schoolId = parseInt(req.headers["x-school"]);
    const inventory = req.body;
    (0, inventory_1.update_inventory__controller)(inventory);
    res.sendStatus(200);
});
v1Inventory.post('/', auth_1.adminAuthorize, async (req, res) => {
    const schoolId = parseInt(req.headers["x-school"]);
    const inventory = req.body;
    (0, inventory_1.insert_inventory__Controller)({ ...inventory, school_id: schoolId, item_id: 0 });
    res.sendStatus(200);
});
exports.default = v1Inventory;

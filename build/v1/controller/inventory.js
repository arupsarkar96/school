"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insert_inventory__Controller = exports.update_inventory__controller = exports.posSellUpdate_Inventory = exports.fetchInventories = void 0;
const inventory_1 = require("../service/inventory");
const fetchInventories = async (schoolId) => {
    const inventories = await (0, inventory_1.fetchInventoriesService)(schoolId);
    return inventories;
};
exports.fetchInventories = fetchInventories;
const posSellUpdate_Inventory = async (items) => {
    items.forEach(item => {
        (0, inventory_1.sellUpdate__Inventory)(item.id, item.count);
    });
};
exports.posSellUpdate_Inventory = posSellUpdate_Inventory;
const update_inventory__controller = async (data) => {
    (0, inventory_1.update_inventory__service)(data);
};
exports.update_inventory__controller = update_inventory__controller;
const insert_inventory__Controller = async (data) => {
    (0, inventory_1.insert_inventory__service)(data);
};
exports.insert_inventory__Controller = insert_inventory__Controller;

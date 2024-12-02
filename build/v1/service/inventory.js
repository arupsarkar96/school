"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insert_inventory__service = exports.update_inventory__service = exports.sellUpdate__Inventory = exports.fetchInventoriesService = void 0;
const db_1 = __importDefault(require("../../db"));
const fetchInventoriesService = async (schoolId) => {
    const connection = await db_1.default.getConnection();
    const sql = 'SELECT * FROM `inventories` WHERE `school_id` = ?';
    const [rows] = await connection.query(sql, [schoolId]);
    connection.release();
    return rows;
};
exports.fetchInventoriesService = fetchInventoriesService;
const sellUpdate__Inventory = async (id, count) => {
    const connection = await db_1.default.getConnection();
    const sql = 'UPDATE `inventories` SET item_stock = item_stock - ? WHERE item_id = ?';
    await connection.query(sql, [count, id]);
    connection.release();
};
exports.sellUpdate__Inventory = sellUpdate__Inventory;
const update_inventory__service = async (data) => {
    const connection = await db_1.default.getConnection();
    const sql = 'UPDATE `inventories` SET item_stock = ?, item_price = ? WHERE item_id = ?';
    await connection.query(sql, [data.item_stock, data.item_price, data.item_id]);
    connection.release();
};
exports.update_inventory__service = update_inventory__service;
const insert_inventory__service = async (data) => {
    const connection = await db_1.default.getConnection();
    const sql = 'INSERT INTO `inventories` (school_id, item_name, item_stock, item_price) VALUES (?,?,?,?)';
    await connection.query(sql, [data.school_id, data.item_name, data.item_stock, data.item_price]);
    connection.release();
};
exports.insert_inventory__service = insert_inventory__service;

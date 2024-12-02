"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayment = void 0;
const iceid_1 = __importDefault(require("iceid"));
const config_1 = __importDefault(require("../../config"));
const db_1 = __importDefault(require("../../db"));
const key = new iceid_1.default(config_1.default.DATACENTER, config_1.default.MACHINE_ID);
const createPayment = async (schoolId, data) => {
    const id = key.generate();
    const connection = await db_1.default.getConnection();
    const sql = 'INSERT INTO transactions (`transaction_id`, `school_id`, `transaction_amount`, `transaction_type`, `transaction_description`, `transaction_mode`) VALUES (?,?,?,?,?,?)';
    const [rows] = await connection.query(sql, [id, schoolId, data.amount, data.type, data.description, data.mode]);
    connection.release();
    return id;
};
exports.createPayment = createPayment;

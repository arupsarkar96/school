"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const config_1 = __importDefault(require("./config"));
const pool = promise_1.default.createPool({
    uri: config_1.default.MYSQL,
    charset: 'utf8mb4',
    waitForConnections: true,
    queueLimit: 10,
    multipleStatements: true,
    enableKeepAlive: true
});
exports.default = pool;

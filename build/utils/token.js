"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const SECRET_KEY = config_1.default.JWT_SECRET;
// Function to generate a JWT token
const generateToken = (payload, expiresIn = '1h') => {
    return jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn });
};
exports.generateToken = generateToken;
// Function to verify a JWT token
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, SECRET_KEY);
    }
    catch (err) {
        throw new Error('Invalid token');
    }
};
exports.verifyToken = verifyToken;

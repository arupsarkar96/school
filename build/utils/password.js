"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = exports.generatePassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const generatePassword = (length = 8) => {
    const characters = '0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
};
exports.generatePassword = generatePassword;
const hashPassword = async (password) => {
    const hash = await bcrypt_1.default.hash(password, saltRounds);
    return hash;
};
exports.hashPassword = hashPassword;
const comparePassword = async (password, hashedPassword) => {
    const match = await bcrypt_1.default.compare(password, hashedPassword);
    return match;
};
exports.comparePassword = comparePassword;

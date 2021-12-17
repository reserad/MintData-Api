"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transactionService_1 = __importDefault(require("./transactionService"));
const services = {
    transactionService: new transactionService_1.default()
};
exports.default = services;

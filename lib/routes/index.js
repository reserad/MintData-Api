"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const transactions_1 = __importDefault(require("./transactions"));
let arrayOfRoutes = [
    transactions_1.default
];
exports.routes = [].concat.apply([], arrayOfRoutes);

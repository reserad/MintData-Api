"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = [
    {
        method: "GET",
        path: "/transactions",
        handler: async (request, h) => {
            const transactions = await h.context.transactionService.getAll();
            return h.response(transactions);
        }
    },
    {
        method: "GET",
        path: "/transactions/{id}",
        options: {
            validate: {
                params: joi_1.default.object({
                    id: joi_1.default.string().guid().required()
                })
            }
        },
        handler: async (request, h) => {
            const { id } = request.params;
            const transactions = await h.context.transactionService.getById(id);
            return h.response(transactions);
        }
    },
    {
        method: "POST",
        path: "/transactions/paginate",
        options: {
            validate: {
                payload: joi_1.default.object({
                    page: joi_1.default.number().required(),
                    take: joi_1.default.number().required()
                })
            }
        },
        handler: async (request, h) => {
            const { page, take } = request.payload;
            const transactions = await h.context.transactionService.paginate(page, take);
            return h.response(transactions);
        }
    },
    {
        method: "POST",
        path: "/transactions/filter",
        options: {
            validate: {
                payload: joi_1.default.object({
                    start: joi_1.default.string().required(),
                    end: joi_1.default.string().required()
                })
            }
        },
        handler: async (request, h) => {
            const { start, end } = request.payload;
            const transactions = await h.context.transactionService.filterByDateRange(start, end);
            const response = h.response(transactions);
            return response;
        }
    },
];

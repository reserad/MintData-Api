import { Request, ResponseToolkit, ResponseObject, ServerRoute } from "@hapi/hapi";
import Joi from "joi";
import moment from "moment";
import { GridPayload } from "../db/models/gridPayload";
import { Pagination } from "../db/models/pagination";
import TransactionService from "../services/transactionService";

export default [
    {
        method: "GET",
        path: "/transactions",
        handler: async (request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
            const transactions = await (h.context.transactionService as TransactionService).getAll();
            return h.response(transactions);
        }
    },
    {
        method: "GET",
        path: "/transactions/{id}",
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.string().guid().required()
                })
            }
        },
        handler: async (request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
            const {id} = request.params;
            const transactions = await (h.context.transactionService as TransactionService).getById(id);
            return h.response(transactions);
        }
    },
    {
        method: "POST",
        path: "/transactions/grid",
        options: {
            validate: {
                payload: Joi.object({
                    page: Joi.number().required(),
                    take: Joi.number().required(),
                    sortBy: Joi.string().required().allow(null),
                    direction: Joi.string().required(),
                    filters: Joi.array().items({
                        column: Joi.string().allow(''),
                        value: Joi.string().allow(''),
                        filterType: Joi.string().allow('')
                    })
                })
            }
        },
        handler: async (request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
            const {page, take, sortBy, direction, filters} = request.payload as GridPayload;
            let transactions = await (h.context.transactionService as TransactionService).grid(page, take, sortBy, direction, filters);
            const allTransactions = await (h.context.transactionService as TransactionService).getAll();
            transactions.categoryTypes = Array.from(new Set(allTransactions.map(transaction => transaction.category)));
            return h.response(transactions);
        }
    },
    {
        method: "POST",
        path: "/transactions/filter",
        options: {
            validate: {
                payload: Joi.object({
                    start: Joi.string().required(),
                    end: Joi.string().required()
                })
            }
        },
        handler: async (request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
            const {start, end} = request.payload as {start: string, end: string};
            const transactions = await (h.context.transactionService as TransactionService).filterByDateRange(start, end);

            const response = h.response(transactions);
            return response;
        }
    },
] as ServerRoute[];
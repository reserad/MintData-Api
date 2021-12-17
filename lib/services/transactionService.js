"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = require("../db/connect");
class TransactionService {
    constructor() {
        this.getAll = async () => {
            return (0, connect_1.knex)('transactions')
                .select()
                .orderBy('date');
        };
        this.getById = async (id) => {
            return (0, connect_1.knex)('transactions')
                .select()
                .where('id', id);
        };
        this.filterByDateRange = async (from, to) => {
            return (0, connect_1.knex)('transactions')
                .select()
                .whereBetween('date', [from, to]);
        };
        this.paginate = async (page, take) => {
            return (0, connect_1.knex)('transactions')
                .paginate({
                perPage: take,
                currentPage: page,
                isLengthAware: true
            })
                .then();
        };
    }
}
exports.default = TransactionService;

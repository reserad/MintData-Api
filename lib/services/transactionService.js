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
        this.grid = async (page, take, sortBy, direction = 'desc', filters) => {
            let chain = (0, connect_1.knex)('transactions')
                .orderBy(sortBy ? sortBy : 'date', direction);
            if (filters.length > 0) {
                filters.forEach(filter => {
                    if (filter.filterType === 'contains') {
                        chain = chain.where(filter.column, 'like', `%${filter.value}%`);
                    }
                    else if (filter.filterType === 'equals') {
                        chain = chain.where(filter.column, '=', filter.value);
                    }
                });
            }
            return chain
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

import {knex} from '../db/connect';
import { GridPayloadFilter } from '../db/models/gridPayload';
import { Transaction } from '../db/models/transaction';
import { TransactonFilter } from '../db/models/transactionFilter';
import { TransactionsGrid } from '../db/models/transactionsGrid';

export default class TransactionService {
    getAll = async () : Promise<Transaction[]> => {
        return knex('transactions')
            .select()
            .orderBy('date');
    }

    getById = async (id: string) : Promise<Transaction[]> => {
        return knex('transactions')
            .select()
            .where('id', id);
    }

    filterByDateRange = async (from: string, to: string) : Promise<Transaction[]> => {
        return knex('transactions')
            .select()
            .whereBetween('date', [from, to])
    }

    grid = async (page: number, take: number, sortBy: string, direction: 'asc' | 'desc' | string = 'desc', filters: GridPayloadFilter[]) : Promise<TransactionsGrid> => {
        let chain = knex('transactions')
            .orderBy(sortBy ? sortBy : 'date', direction);

        if (filters.length > 0) {
            filters.forEach(filter => {
                if (filter.filterType === 'contains') {
                    chain = chain.where(filter.column, 'like', `%${filter.value}%`);
                } else if (filter.filterType === 'equals') {
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
    }
}
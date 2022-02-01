import {knex} from '../db/connect';
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

    grid = async (page: number, take: number, sortBy: string, direction: 'asc' | 'desc' = 'desc') : Promise<TransactionsGrid> => {
        return knex('transactions')
            .orderBy(sortBy ? sortBy : 'date', direction)
            .paginate({
                perPage: take,
                currentPage: page,
                isLengthAware: true
            })
            .then();
    }
}
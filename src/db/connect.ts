import Knex from 'knex';
import knexfile from './knexfile';
import {attachPaginate} from 'knex-paginate';
import pg from 'pg';

pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value: string) => {
    return parseFloat(value);
});

const config = knexfile.development;

const knex = Knex(config);
attachPaginate();

export {
    knex
}
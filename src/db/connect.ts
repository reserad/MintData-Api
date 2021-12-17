import Knex from 'knex';
import knexfile from './knexfile';
import {attachPaginate} from 'knex-paginate';

const config = knexfile.development;

const knex = Knex(config);
attachPaginate();

export {
    knex
}
import { ServerRoute } from '@hapi/hapi';
import transactionsRoutes from './transactions';

let arrayOfRoutes: ServerRoute[][] = [
    transactionsRoutes
];

export const routes = ([] as ServerRoute[]).concat.apply([], arrayOfRoutes);
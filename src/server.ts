'use strict';

import Hapi, { Server } from "@hapi/hapi";
import {routes} from "./routes";
import services from "./services";

export let server: Server;

export const init = async function(): Promise<Server> {
    server = Hapi.server({
        port: process.env.PORT || 4000,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
                headers: ['Authorization', "Accept", "Content-Type"],
                exposedHeaders: ['Accept'],
                additionalExposedHeaders: ['Accept'],
                maxAge: 60,
                credentials: false
            }
        }
    });

    server.realm.modifiers.route.prefix = '/api';
    
    server.bind(services);
    server.route(routes);

    server.ext('onRequest', (request, h) => {
        return h.continue;
    })

    return server;
};

export const start = async function (): Promise<void> {
    console.log(`Listening on ${server.settings.host}:${server.settings.port}`);
    return server.start();
};

process.on('unhandledRejection', (err) => {
    console.error("unhandledRejection");
    console.error(err);
    process.exit(1);
});
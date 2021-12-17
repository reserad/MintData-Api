"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST || "localhost",
            port: process.env.DB_PORT || '5432',
            database: process.env.DB_DATABASE || "postgres",
            user: process.env.DB_USER || "postgres",
            password: process.env.DB_PASSWORD || "postgres"
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        }
    }
};

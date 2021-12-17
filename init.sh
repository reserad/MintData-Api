#!/bin/bash
set -e
export DB_PASSWORD=$POSTGRES_PASSWORD;
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE USER $APP_DB_USER WITH PASSWORD '$APP_DB_PASS';
  CREATE DATABASE $APP_DB_NAME;
  GRANT ALL PRIVILEGES ON DATABASE $APP_DB_NAME TO $APP_DB_USER;
  \connect $APP_DB_NAME $APP_DB_USER
  BEGIN;
    CREATE TABLE IF NOT EXISTS transactions (
        "Id" uuid DEFAULT uuid_generate_v4 (),
        "Date" text NOT NULL,
        "Description" text NOT NULL,
        "Original Description" text NOT NULL,
        "Amount" text NOT NULL,
        "Transaction Type" text NOT NULL,
        "Category" text NOT NULL,
        "Account Name" text NOT NULL,
        "Labels" text NOT NULL,
        "Notes" text NOT NULL
    );
  COMMIT;
EOSQL
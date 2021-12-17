CREATE USER mint WITH PASSWORD 'mint';
ALTER USER mint WITH SUPERUSER;

GRANT ALL PRIVILEGES ON DATABASE postgres to mint;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE transactions (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4 (),
    "date" timestamp NOT NULL,
    "description" text NOT NULL,
    "originalDescription" text NOT NULL,
    "amount" text NOT NULL,
    "transactionType" text NOT NULL,
    "category" text NOT NULL,
    "accountName" text NOT NULL,
    "labels" text NOT NULL,
    "notes" text NOT NULL,
    CONSTRAINT transactions_pkey_ PRIMARY KEY ("id")
);
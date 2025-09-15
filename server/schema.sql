CREATE DATABASE "budgetdb"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

--GRANT TEMPORARY, CONNECT ON DATABASE "expensedb" TO PUBLIC;
CREATE USER budget_user  WITH PASSWORD 'WorkHardPlayHard!';
GRANT ALL ON DATABASE "expensedb" TO budget_user;
GRANT ALL ON DATABASE "expensedb" TO postgres; 

ALTER ROLE budget_user
    SET search_path TO public, budgetdb;

-- CREATE SCHEMA
SET search_path TO budgetdb;

CREATE SCHEMA IF NOT EXISTS budgetdb
    AUTHORIZATION budget_user;

COMMENT ON SCHEMA v1.0
    IS 'prototype for budget project';

GRANT USAGE ON SCHEMA budgetdb TO PUBLIC;
GRANT ALL ON SCHEMA budgetdb TO budget_user;

--Set for a specific database
--ALTER DATABASE expensedb SET search_path TO expensedb;

-- Set for a specific role (user)
ALTER ROLE expense_user SET search_path TO public, 'expensedb';

-- DEFINE TABLES
CREATE TABLE currency (
    name VARCHAR(10) UNIQUE NOT NULL
);

CREATE TABLE budget_category(
   id SERIAL PRIMARY KEY,
   name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE budget_status (
    name VARCHAR(10) UNIQUE NOT NULL
);

CREATE TABLE budget (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description VARCHAR(255),
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL REFERENCES currency(name),
    category INT NOT NULL REFERENCES budget_category(id),
    crte_dttm date NOT NULL DEFAULT CURRENT_DATE,
    end_dttm date,
    status VARCHAR(10) NOT NULL REFERENCES budget_status(name),
    details JSON
);

create table budget_transaction_type (
    name VARCHAR(100) UNIQUE NOT NULL
)

CREATE TABLE budget_transaction (
    id SERIAL PRIMARY KEY,
    type VARCHAR(10) NOT NULL ßREFERENCES budget_transaction_type(name),
    crte_dttm timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    budget_id INT NOT NULL REFERENCES budget(id),
    description VARCHAR(255),
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL REFERENCES currency(name),
    actual_amount DECIMAL(10, 2) NOT NULL,
    actual_currency VARCHAR(10) NOT NULL REFERENCES currency(name),
    details JSON
);


CREATE TABLE budget_frequency_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description VARCHAR(255),
    days_interval INT NOT NULL
);

CREATE TABLE budget_schedule (
    budget_id INT NOT NULL REFERENCES budget(id),
    crte_dttm timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    end_date DATE NOT NULL,
    frequency INT REFERENCES budget_frequency_type(id)
    next_date DATE
);

-- grant permissions
GRANT ALL ON TABLE public.budget TO budget_user;
GRANT ALL ON TABLE public.budget_transaction TO budget_user;
GRANT ALL ON TABLE public.budget_schedule TO budget_user;
GRANT ALL ON TABLE public.budget_frequency_type TO budget_user;
GRANT ALL ON TABLE public.currency TO budget_user;
GRANT ALL ON TABLE public.budget_category TO budget_user;
GRANT ALL ON TABLE public.budget_transaction TO budget_user;
GRANT ALL ON TABLE public.budget_status TO budget_user;
GRANT ALL ON TABLE public.budget_transaction_type TO budget_user;


GRANT ALL ON SEQUENCE public.budget_category_id_seq TO budget_user;
GRANT ALL ON SEQUENCE public.budget_id_seq TO budget_user;
GRANT ALL ON SEQUENCE public.budget_transactions_id_seq TO budget_user;
GRANT ALL ON SEQUENCE public.budget_frequency_type_id_seq TO budget_user;
GRANT ALL ON SEQUENCE public.budget_transaction_id_seq TO budget_user;


-- alter to add column
ALTER TABLE IF EXISTS public.budget_transaction
    ADD COLUMN type character varying(10) NOT NULL
	REFERENCES budget_transaction_type(name) default 'payment';

-- create values to init db --- 
INSERT INTO currency (name) values('usd');
INSERT INTO currency (name) values('ksh');
INSERT INTO currency (name) values('birr');

INSERT INTO budget_transaction_type (name) values('payment');
INSERT INTO budget_transaction_type (name) values('service_charge');
INSERT INTO budget_transaction_type (name) values('refund');


INSERT INTO budget_status (name) values('active');
INSERT INTO budget_status (name) values('closed');
INSERT INTO budget_status (name) values('suspended');

insert into budget_category (name) values('realestate');
insert into budget(name,amount,currency,category) values('Zen Apt', 100000, 'usd',1);
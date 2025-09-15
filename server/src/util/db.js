
// const { Pool } = require('pg');
// require('dotenv').config();

import { Pool } from 'pg'
import dotenv from 'dotenv'
dotenv.config({path:['.env.local', '.env']})

// 2. Database Connection Pool
// It's a best practice to use a connection pool.
// The pool will manage multiple client connections.
export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});


import dotenv from 'dotenv';
import { Pool } from 'pg';
dotenv.config();

const {
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  ENV,
} = process.env;

const pool = new Pool({
  user: POSTGRES_USER,
  host: POSTGRES_HOST,
  database: ENV === 'test' ? POSTGRES_TEST_DB : POSTGRES_DB,
  password: POSTGRES_PASSWORD,
  port: POSTGRES_PORT as unknown as number,
});

export default pool;

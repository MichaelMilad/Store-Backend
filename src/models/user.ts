import pool from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const { PASSWORD_PEPPER, JWT_SECRET } = process.env;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS as string);

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
};

export class userStore {
  async index(): Promise<User[]> {
    try {
      const conn = await pool.connect();
      const result = await conn.query('SELECT * FROM users;');
      await conn.release();
      return result.rows;
    } catch (e) {
      throw new Error(`Couldnt show users ${e}`);
    }
  }

  async create(firstName: string, lastName: string, password: string): Promise<[User, string]> {
    try {
      const conn = await pool.connect();
      const sql = 'INSERT INTO users(firstName,lastName,password) VALUES ($1, $2, $3) RETURNING *;';
      const hash = await bcrypt.hash(password + PASSWORD_PEPPER, SALT_ROUNDS);
      const result = await conn.query(sql, [firstName, lastName, hash]);
      const token = await jwt.sign(firstName + lastName, JWT_SECRET as string);
      await conn.release();
      return [result.rows[0], token];
    } catch (e) {
      throw new Error(`Couldnt get create user ${e}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await pool.connect();
      const sql = 'SELECT * FROM users WHERE id = $1;';
      const result = await conn.query(sql, [id]);
      await conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`Couldnt get show user ${e}`);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const conn = await pool.connect();
      const sql = 'DELETE FROM users WHERE id = $1 RETURNING *;';
      const result = await conn.query(sql, [id]);
      await conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`Couldnt get show user ${e}`);
    }
  }

  async login(user: User): Promise<[User, string] | string> {
    try {
      const { firstName, lastName, password } = user;
      const conn = await pool.connect();
      const sql = 'SELECT * FROM users WHERE firstName =$1 AND lastName =$2';
      const foundUser = await conn.query(sql, [firstName, lastName]);
      if (!foundUser.rows[0]) {
        return 'Invalid Credentials';
      }
      const isValid = await bcrypt.compare(
        (password as string) + PASSWORD_PEPPER,
        foundUser.rows[0].password
      );
      await conn.release();
      if (isValid) {
        const token = await jwt.sign(firstName + lastName, JWT_SECRET as string);
        return [foundUser.rows[0], token];
      } else {
        return 'Invalid Credentials';
      }
    } catch (e) {
      throw new Error(`Couldnt Login ${e}`);
    }
  }
}

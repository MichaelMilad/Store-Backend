import pool from '../database';
import dotenv from 'dotenv';
dotenv.config();

export type Product = {
  id?: number;
  name: string;
  price: number;
  category?: string;
};

export class productStore {
  async index(category: string): Promise<Product[] | null> {
    try {
      const conn = await pool.connect();
      if (!category) {
        const result = await conn.query('SELECT * FROM products;');
        await conn.release();
        return result.rows;
      } else {
        const result = await conn.query('SELECT * FROM products WHERE category=$1', [category]);
        await conn.release();
        if (result.rows.length > 0) return result.rows;
        else return null;
      }
    } catch (e) {
      throw new Error(`Couldnt show products ${e}`);
    }
  }

  async create(name: string, price: number, category: string): Promise<Product> {
    try {
      const conn = await pool.connect();
      const sql = 'INSERT INTO products (name,price,category) VALUES ($1,$2,$3) RETURNING *;';
      const result = await conn.query(sql, [name, price, category]);
      await conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`Couldnt create product ${e}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn = await pool.connect();
      const sql = 'SELECT * FROM products WHERE id=$1';
      const result = await conn.query(sql, [id]);
      await conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`Couldnt show product ${e}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const conn = await pool.connect();
      const sql = 'DELETE FROM products WHERE id=$1 RETURNING *;';
      const result = await conn.query(sql, [id]);
      await conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`Couldnt delete product ${e}`);
    }
  }
}

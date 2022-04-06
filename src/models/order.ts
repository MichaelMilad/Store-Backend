import pool from '../database';

export type Order = {
  id?: number;
  user_id: number;
  product_id: number;
  quantity: number;
};

export class orderStore {
  async currentOrders(user_id: number): Promise<Order[]> {
    try {
      const conn = await pool.connect();
      const sql = 'SELECT * FROM orders WHERE user_id =$1';
      const result = await conn.query(sql, [user_id]);
      await conn.release();
      return result.rows;
    } catch (e) {
      throw new Error(`Couldnt get current orders ${e}`);
    }
  }

  async createOrder(user_id: number, product_id: number, quantity: number): Promise<Order> {
    try {
      const conn = await pool.connect();
      const sql = 'INSERT INTO orders (user_id,product_id,quantity) VALUES ($1,$2,$3) RETURNING *';
      const result = await conn.query(sql, [user_id, product_id, quantity]);
      return result.rows[0];
    } catch (e) {
      throw new Error(`Couldnt create order ${e}`);
    }
  }
}

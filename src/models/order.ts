import pool from '../database';

export type Order = {
  id?: number;
  user_id: number;
};

export type Order_Product = {
  order_id: number;
  product_id: number;
  quantity: number;
};

export class orderStore {
  async currentOrders(user_id: number): Promise<Order_Product[]> {
    try {
      const conn = await pool.connect();
      const sql = 'SELECT * FROM orders WHERE user_id =$1';
      const order_id = await conn.query(sql, [user_id]);
      const sql2 = 'SELECT * FROM order_products WHERE order_id =$1';
      const result = await conn.query(sql2, [order_id.rows[0].id]);
      await conn.release();
      return result.rows;
    } catch (e) {
      throw new Error(`Couldnt get current orders ${e}`);
    }
  }

  async createOrder(user_id: number, product_id: number, quantity: number): Promise<Order_Product> {
    try {
      const conn = await pool.connect();
      const sql1 = 'SELECT * FROM orders WHERE user_id=$1';
      let order = await conn.query(sql1, [user_id]);
      if (!order.rows.length) {
        const sql2 = 'INSERT INTO orders (user_id) VALUES ($1) RETURNING *';
        order = await conn.query(sql2, [user_id]);
      }
      const sql3 =
        'INSERT INTO order_products (order_id,product_id,quantity) VALUES ($1,$2,$3) RETURNING *';
      const order_product = await conn.query(sql3, [order.rows[0].id, product_id, quantity]);
      return order_product.rows[0];
    } catch (e) {
      throw new Error(`Couldnt create order ${e}`);
    }
  }
}

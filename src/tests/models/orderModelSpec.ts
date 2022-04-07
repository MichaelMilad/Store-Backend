import { orderStore } from '../../models/order';
import pool from '../../database';
import { User } from '../../models/user';
import { Product } from '../../models/product';
const store = new orderStore();

let user: User;
let product: Product;

describe('Testing Order Model', () => {
  beforeAll(async () => {
    //creating a user
    const conn = await pool.connect();
    const userSQL =
      'INSERT INTO users (firstName,lastName,password) VALUES ($1,$2,$3) RETURNING *;';
    const result1 = await conn.query(userSQL, ['test user', 'user', '123']);
    user = result1.rows[0];

    //creating a product
    const productSQL = 'INSERT INTO products (name,price,category) VALUES ($1,$2,$3) RETURNING *;';
    const result2 = await conn.query(productSQL, ['test product', 11, 'test category']);
    product = result2.rows[0];
  });

  it('currentOrders Method Should Be Defined', () => {
    expect(store.currentOrders).toBeDefined();
  });
  it('createOrder Method Should Be Defined', () => {
    expect(store.createOrder).toBeDefined();
  });
  it('Create Order should create a new order', async () => {
    const order = await store.createOrder(user.id as number, product.id as number, 50);
    expect(order.order_id).toBe(1);
    expect(order.product_id).toBe(1);
    expect(order.quantity).toBe(50);
  });
  it('Should get the Current Orders by UserID', async () => {
    const order = await store.currentOrders(user.id as number);
    expect(order.length).toBeTruthy();
    const { order_id, product_id, quantity } = order[0];
    expect(order_id).toBe(1);
    expect(product_id).toBe(1);
    expect(quantity).toBe(50);
  });

  afterAll(async () => {
    const conn = await pool.connect();
    await conn.query('DELETE FROM order_products;');
    await conn.query('DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;');
    await conn.query('DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;');
    await conn.query('DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;');
    await conn.release();
  });
});

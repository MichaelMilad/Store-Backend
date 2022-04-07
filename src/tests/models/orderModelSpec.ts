import pool from '../../database';
import { orderStore } from '../../models/order';
import app from '../../server';
import supertest from 'supertest';
import dotenv from 'dotenv';
dotenv.config();
const token = process.env.token as string;
const store = new orderStore();

const request = supertest(app);

describe('Testing Order Model', () => {
  it('currentOrders Method Should Be Defined', () => {
    expect(store.currentOrders).toBeDefined();
  });
  it('createOrder Method Should Be Defined', () => {
    expect(store.createOrder).toBeDefined();
  });
});

describe('Testing Order Methods Functionality', () => {
  beforeAll(async () => {
    await request
      .post('/products')
      .set('Content-type', 'application/json')
      .set('token', token)
      .send({
        name: 'Test Product',
        price: 1123,
        category: 'jasmine',
      });
    await request.post('/users').set('Content-type', 'application/json').set('token', token).send({
      firstName: 'michael',
      lastName: 'foo',
      password: 'dummy',
    });
  });

  it('Should Create a New Order', async () => {
    const res = await request
      .post('/orders/1')
      .set('Content-type', 'application/json')
      .set('token', token)
      .send({
        product_id: 1,
        quantity: 1123,
      });
    expect(res.status).toBe(200);
    const { order_id, product_id, quantity } = res.body;
    expect(order_id).toBe(1);
    expect(product_id).toBe(1);
    expect(quantity).toBe(1123);
  });

  it('Should Show Current Orders', async () => {
    const res = await request.get('/orders/1').set('token', token);
    expect(res.status).toBe(200);
    const { order_id, product_id, quantity } = res.body[0];
    expect(order_id).toBe(1);
    expect(product_id).toBe(1);
    expect(quantity).toBe(1123);
  });

  afterAll(async () => {
    const conn = await pool.connect();
    await conn.query('DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;');
    await conn.query('DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;');
    await conn.release();
  });
});

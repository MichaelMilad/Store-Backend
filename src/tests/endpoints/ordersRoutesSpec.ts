import pool from '../../database';
import supertest from 'supertest';
import app from '../../server';
import dotenv from 'dotenv';
dotenv.config();
const token = process.env.token as string;

const request = supertest(app);

describe('Testing Endpoints Response for Orders', () => {
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
      firstname: 'michael',
      lastname: 'foo',
      password: 'dummy',
    });
  });

  it('Should Respond to "/orders" with status of 200', async () => {
    const response = await request.get('/orders');
    expect(response.status).toBe(200);
  });

  it('Should Create a New Order on "/orders" [POST]', async () => {
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

  it('Should Show Current Orders on "/orders"', async () => {
    const res = await request.get('/orders/1').set('token', token);
    expect(res.status).toBe(200);
    const { order_id, product_id, quantity } = res.body[0];
    expect(order_id).toBe(1);
    expect(product_id).toBe(1);
    expect(quantity).toBe(1123);
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

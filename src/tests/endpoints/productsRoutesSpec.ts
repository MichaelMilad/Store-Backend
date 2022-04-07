import pool from '../../database';
import supertest from 'supertest';
import app from '../../server';
import dotenv from 'dotenv';
dotenv.config();
const token = process.env.token as string;

const request = supertest(app);

describe('Test Endpoints Response for Products', () => {
  it('Should Respond to "/products" with status of 200', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });
  it('Should Respond to "/products/:id" with status of 200', async () => {
    const response = await request.get('/products/1');
    expect(response.status).toBe(200);
  });
  it('Should Respond to "/products/id" [DELETE] with status of 200', async () => {
    const response = await request.delete('/products/1').set('token', token);
    expect(response.status).toBe(200);
  });
  it('Should Create a new Product', async () => {
    const res = await request
      .post('/products')
      .set('Content-type', 'application/json')
      .set('token', token)
      .send({
        name: 'Test Product',
        price: 1123,
        category: 'jasmine',
      });
    expect(res.status).toBe(200);
    const { name, price, category } = res.body;
    expect(name).toEqual('Test Product');
    expect(price).toBeCloseTo(1123.0);
    expect(category).toEqual('jasmine');
  });
  it('Should Show a Product', async () => {
    const res = await request.get('/products/1');
    const { name, price, category } = res.body;
    expect(name).toEqual('Test Product');
    expect(price).toBeCloseTo(1123.0);
    expect(category).toEqual('jasmine');
  });
  it('Should Delete the Product', async () => {
    const res = await request.delete('/products/1').set('token', token);
    const { name, price, category } = res.body;
    expect(name).toEqual('Test Product');
    expect(price).toBeCloseTo(1123.0);
    expect(category).toEqual('jasmine');
  });

  afterAll(async () => {
    const conn = await pool.connect();
    await conn.query('ALTER SEQUENCE products_id_seq RESTART WITH 1;');
    await conn.release();
  });
});

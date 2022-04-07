import pool from '../../database';
import { productStore } from '../../models/product';
import app from '../../server';
import supertest from 'supertest';
import dotenv from 'dotenv';
dotenv.config();
const token = process.env.token as string;
const store = new productStore();

const request = supertest(app);

describe('Testing Product Model', () => {
  it('Create Method Should Be Defined', () => {
    expect(store.create).toBeDefined();
  });
  it('Index Method Should Be Defined', () => {
    expect(store.index).toBeDefined();
  });
  it('Show Method Should Be Defined', () => {
    expect(store.show).toBeDefined();
  });
  it('Delete Method Should Be Defined', () => {
    expect(store.delete).toBeDefined();
  });
});

describe('Testing Product Method Functionality', () => {
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

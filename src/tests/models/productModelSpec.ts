import pool from '../../database';
import { productStore } from '../../models/product';
import dotenv from 'dotenv';
dotenv.config();

const store = new productStore();

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
  it('Should Create a New Product', async () => {
    const product = await store.create('test product', 100, 'jasmine');
    const { name, price, category } = product;
    expect(name).toEqual('test product');
    expect(price).toBeCloseTo(100);
    expect(category).toEqual('jasmine');
  });
  it('Should Show Product By Id', async () => {
    const product = await store.show(1);
    const { name, price, category } = product;
    expect(name).toEqual('test product');
    expect(price).toBeCloseTo(100);
    expect(category).toEqual('jasmine');
  });
  it('Should Show All Products', async () => {
    const result = await store.index();
    if (!result) {
      return;
    } else {
      expect(result.length).toBeTruthy;
      const product = result[0];
      const { name, price, category } = product;
      expect(name).toEqual('test product');
      expect(price).toBeCloseTo(100);
      expect(category).toEqual('jasmine');
    }
  });
  it('Should Delete Product by ID', async () => {
    const product = await store.delete(1);
    const { name, price, category } = product;
    expect(name).toEqual('test product');
    expect(price).toBeCloseTo(100);
    expect(category).toEqual('jasmine');
  });

  afterAll(async () => {
    const conn = await pool.connect();
    await conn.query('ALTER SEQUENCE products_id_seq RESTART WITH 1;');
  });
});

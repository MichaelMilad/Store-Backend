import pool from '../../database';
import { userStore } from '../../models/user';
import app from '../../server';
import supertest from 'supertest';
import dotenv from 'dotenv';
dotenv.config();
const token = process.env.token as string;
const store = new userStore();

const request = supertest(app);

describe('Testing User Model', () => {
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
  it('Login Method Should Be Defined', () => {
    expect(store.login).toBeDefined();
  });
});

describe('Testing User Methods Functionality', () => {
  it('Should Create a New User', async () => {
    const res = await request
      .post('/users')
      .set('Content-type', 'application/json')
      .set('token', token)
      .send({
        firstName: 'michael',
        lastName: 'foo',
        password: 'dummy',
      });
    expect(res.status).toBe(200);
    const { id, firstname, lastname } = res.body;
    expect(id).toBe(1);
    expect(firstname).toEqual('michael');
    expect(lastname).toEqual('foo');
  });

  it('Should Show a User', async () => {
    const res = await request.get('/users/1').set('token', token);
    expect(res.status).toBe(200);
    const { id, firstname, lastname } = res.body;
    expect(id).toBe(1);
    expect(firstname).toEqual('michael');
    expect(lastname).toEqual('foo');
  });

  it('Should Login', async () => {
    const res = await request
      .post('/users/login')
      .set('Content-type', 'application/json')
      .set('token', token)
      .send({
        firstName: 'michael',
        lastName: 'foo',
        password: 'dummy',
      });
    expect(res.status).toBe(200);
    const { id, firstname, lastname } = res.body;
    expect(id).toBe(1);
    expect(firstname).toEqual('michael');
    expect(lastname).toEqual('foo');
  });

  it('Should Delete a User', async () => {
    const res = await request.delete('/users/1').set('token', token);
    expect(res.status).toBe(200);
    const { id, firstname, lastname } = res.body;
    expect(id).toBe(1);
    expect(firstname).toEqual('michael');
    expect(lastname).toEqual('foo');
  });

  afterAll(async () => {
    const conn = await pool.connect();
    await conn.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;');
    await conn.release();
  });
});

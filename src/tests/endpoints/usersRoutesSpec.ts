import pool from '../../database';
import supertest from 'supertest';
import app from '../../server';
import dotenv from 'dotenv';
dotenv.config();

const request = supertest(app);
const token = process.env.token as string;

describe('Testing Endpoints Response For Users', () => {
  it('Should Respond to "/users/id" with status of 200', async () => {
    const response = await request.get('/users/2').set('token', token);
    expect(response.status).toBe(200);
  });
  it('Should Respond to "/users" with status of 200', async () => {
    const response = await request.get('/users').set('token', token);
    expect(response.status).toBe(200);
  });
  it('Should Respond to "/users/id" [DELETE] Delete User with status of 200', async () => {
    const response = await request.delete('/users/1').set('token', token);
    expect(response.status).toBe(200);
  });
  it('Should Create a New User', async () => {
    const res = await request
      .post('/users')
      .set('Content-type', 'application/json')
      .set('token', token)
      .send({
        firstname: 'michael',
        lastname: 'foo',
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
        firstname: 'michael',
        lastname: 'foo',
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

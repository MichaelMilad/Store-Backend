import supertest from 'supertest';
import app from '../../server';
import dotenv from 'dotenv';
dotenv.config();

const request = supertest(app);
const token = process.env.token as string;

describe('Test endpoint response for Users', () => {
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
});

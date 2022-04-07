import supertest from 'supertest';
import app from '../../server';
import dotenv from 'dotenv';
dotenv.config();
const token = process.env.token as string;

const request = supertest(app);

describe('Test endpoint response for Products', () => {
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
});

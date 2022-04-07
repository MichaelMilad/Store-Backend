import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Test endpoint response for Orders', () => {
  it('Should Respond to "/orders" with status of 200', async () => {
    const response = await request.get('/orders');
    expect(response.status).toBe(200);
  });
});

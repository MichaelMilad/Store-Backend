import supertest from 'supertest';
import app from '../../server';
import { userStore } from '../../models/user';
const store = new userStore();

const request = supertest(app);
const user = {
  firstName: 'michael',
  lastName: 'test',
  password: 'dummy',
};
let token: string;
beforeAll(async () => {
  token = await store.create(user.firstName, user.lastName, user.password);
});

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
  it('Should Respond to "/users" [POST] Create User and with status of 200', async () => {
    const response = await request.post('/users').send({
      firstName: 'First',
      lastName: 'Last',
      password: 'foo',
    });
    expect(response.status).toBe(200);
  });
});

import supertest from 'supertest';
import app from '../../server';
import { userStore } from '../../models/user';
import { productStore } from '../../models/product';
const userstore = new userStore();
const store = new productStore();

const request = supertest(app);
const user = {
  firstName: 'michael',
  lastName: 'test',
  password: 'dummy',
};
const product = {
  name: 'Sword',
  price: 6,
  category: 'weapons',
};
let token: string;
beforeAll(async () => {
  token = await userstore.create(user.firstName, user.lastName, user.password);
  await store.create(product.name, product.price, product.category);
});

describe('Test endpoint response for Products', () => {
  it('Should Respond to "/users/id" with status of 200', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });
  it('Should Respond to "/products/id" [DELETE] with status of 200', async () => {
    const response = await request.delete('/products/1').set('token', token);
    expect(response.status).toBe(200);
  });
  it('Should Respond to "/products" [POST] Create Product with status of 302(redirect)', async () => {
    const response = await request.post('/products').set('token', token).send({
      name: 'test product',
      price: 5,
    });
    expect(response.status).toBe(302);
  });
});

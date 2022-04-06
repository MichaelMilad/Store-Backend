import supertest from 'supertest';
import app from '../../server';
import { userStore } from '../../models/user';
import { productStore } from '../../models/product';
const userstore = new userStore();
const productstore = new productStore();

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
  await productstore.create(product.name, product.price, product.category);
});

describe('Test endpoint response for Orders', () => {
  it('Should Respond to "/orders" with status of 200', async () => {
    const response = await request.get('/orders');
    expect(response.status).toBe(200);
  });
  it('Should Respond to "/orders/:user_id" [DELETE] with status of 200', async () => {
    const response = await request.get('/orders/1').set('token', token);
    expect(response.status).toBe(200);
  });
  it('Should Respond to "/order/:user_id" [POST] Create Order with status of 200', async () => {
    const response = await request.post('/orders/1').set('token', token).send({
      product_id: 1,
      quantity: 5,
    });
    expect(response.status).toBe(200);
  });
});

import { orderStore } from '../../models/order';
const store = new orderStore();

describe('Testing Order Model', () => {
  it('currentOrders Method Should Be Defined', () => {
    expect(store.currentOrders).toBeDefined();
  });
  it('createOrder Method Should Be Defined', () => {
    expect(store.createOrder).toBeDefined();
  });
});

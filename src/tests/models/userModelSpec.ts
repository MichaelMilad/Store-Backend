import { userStore } from '../../models/user';
const store = new userStore();

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

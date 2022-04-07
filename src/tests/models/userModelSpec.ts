import pool from '../../database';
import { userStore, User } from '../../models/user';

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

  it('Should Create a new User', async () => {
    const result = await store.create('michael', 'krass', '123');
    const user = result[0];
    expect(user.firstname).toEqual('michael');
    expect(user.lastname).toEqual('krass');
    expect(user.password).not.toEqual('michael');
  });
  it('Should login', async () => {
    const user = {
      firstname: 'michael',
      lastname: 'krass',
      password: '123',
    };
    const result = await store.login(user);
    const loggedIn = result[0] as User;
    expect(loggedIn.firstname).toEqual('michael');
    expect(loggedIn.lastname).toEqual('krass');
  });
  it('Should show User by it ID', async () => {
    const user = await store.show(1);
    expect(user.firstname).toEqual('michael');
    expect(user.lastname).toEqual('krass');
  });
  it('Should show All Users', async () => {
    const user = await store.index();
    expect(user.length).toBeTruthy();
    expect(user[0].firstname).toEqual('michael');
  });
  it('Should Delete User by its ID', async () => {
    const user = await store.delete(1);
    expect(user.firstname).toEqual('michael');
    expect(user.lastname).toEqual('krass');
  });

  afterAll(async () => {
    const conn = await pool.connect();
    await conn.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;');
  });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../../models/user");
var store = new user_1.userStore();
describe('Testing User Model', function () {
    it('Create Method Should Be Defined', function () {
        expect(store.create).toBeDefined();
    });
    it('Index Method Should Be Defined', function () {
        expect(store.index).toBeDefined();
    });
    it('Show Method Should Be Defined', function () {
        expect(store.show).toBeDefined();
    });
    it('Delete Method Should Be Defined', function () {
        expect(store.delete).toBeDefined();
    });
    it('Login Method Should Be Defined', function () {
        expect(store.login).toBeDefined();
    });
});

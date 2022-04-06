"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = require("../../models/order");
var store = new order_1.orderStore();
describe('Testing Order Model', function () {
    it('currentOrders Method Should Be Defined', function () {
        expect(store.currentOrders).toBeDefined();
    });
    it('createOrder Method Should Be Defined', function () {
        expect(store.createOrder).toBeDefined();
    });
});

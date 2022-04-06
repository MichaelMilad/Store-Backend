"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var product_1 = require("../../models/product");
var store = new product_1.productStore();
describe('Testing Product Model', function () {
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
});

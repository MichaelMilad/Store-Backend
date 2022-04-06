"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1.default.config();
var _a = process.env, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_TEST_DB = _a.POSTGRES_TEST_DB, POSTGRES_PORT = _a.POSTGRES_PORT, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, ENV = _a.ENV;
var pool = new pg_1.Pool({
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: ENV === 'test' ? POSTGRES_TEST_DB : POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    port: POSTGRES_PORT,
});
exports.default = pool;

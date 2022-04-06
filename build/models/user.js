"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStore = void 0;
var database_1 = __importDefault(require("../database"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var dotenv_1 = __importDefault(require("dotenv"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
var _a = process.env, PASSWORD_PEPPER = _a.PASSWORD_PEPPER, JWT_SECRET = _a.JWT_SECRET;
var SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
var userStore = /** @class */ (function () {
    function userStore() {
    }
    userStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query('SELECT * FROM users;')];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, conn.release()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, result.rows];
                    case 4:
                        e_1 = _a.sent();
                        throw new Error("Couldnt show users ".concat(e_1));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    userStore.prototype.create = function (firstName, lastName, password) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, hash, token, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'INSERT INTO users(firstName,lastName,password) VALUES ($1, $2, $3);';
                        return [4 /*yield*/, bcrypt_1.default.hash(password + PASSWORD_PEPPER, SALT_ROUNDS)];
                    case 2:
                        hash = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [firstName, lastName, hash])];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, jsonwebtoken_1.default.sign(firstName + lastName, JWT_SECRET)];
                    case 4:
                        token = _a.sent();
                        return [4 /*yield*/, conn.release()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, token];
                    case 6:
                        e_2 = _a.sent();
                        throw new Error("Couldnt get create user ".concat(e_2));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    userStore.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * FROM users WHERE id = $1;';
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, conn.release()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, result.rows[0]];
                    case 4:
                        e_3 = _a.sent();
                        throw new Error("Couldnt get show user ".concat(e_3));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    userStore.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'DELETE FROM users WHERE id = $1;';
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, conn.release()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, result.rows[0]];
                    case 4:
                        e_4 = _a.sent();
                        throw new Error("Couldnt get show user ".concat(e_4));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    userStore.prototype.login = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var firstName, lastName, password, conn, sql, foundUser, isValid, token, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        firstName = user.firstName, lastName = user.lastName, password = user.password;
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * FROM users WHERE firstName =$1 AND lastName =$2';
                        return [4 /*yield*/, conn.query(sql, [firstName, lastName])];
                    case 2:
                        foundUser = _a.sent();
                        if (!foundUser.rows[0]) {
                            return [2 /*return*/, 'Invalid Credentials'];
                        }
                        return [4 /*yield*/, bcrypt_1.default.compare(password + PASSWORD_PEPPER, foundUser.rows[0].password)];
                    case 3:
                        isValid = _a.sent();
                        return [4 /*yield*/, conn.release()];
                    case 4:
                        _a.sent();
                        if (!isValid) return [3 /*break*/, 6];
                        return [4 /*yield*/, jsonwebtoken_1.default.sign(firstName + lastName, JWT_SECRET)];
                    case 5:
                        token = _a.sent();
                        return [2 /*return*/, token];
                    case 6: return [2 /*return*/, 'Invalid Credentials'];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        e_5 = _a.sent();
                        throw new Error("Couldnt Login ".concat(e_5));
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return userStore;
}());
exports.userStore = userStore;

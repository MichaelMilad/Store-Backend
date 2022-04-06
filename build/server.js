"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var productsRoutes_1 = __importDefault(require("./routes/productsRoutes"));
var ordersRoutes_1 = __importDefault(require("./routes/ordersRoutes"));
var cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static('*', { maxAge: 1000 * 60 * 60 }));
app.use('/users', userRoutes_1.default);
app.use('/products', productsRoutes_1.default);
app.use('/orders', ordersRoutes_1.default);
app.get('/', function (_req, res) {
    res.send('Store Front - Backend Project');
});
app.listen(process.env.PORT, function () {
    // eslint-disable-next-line no-console
    console.log("starting app on: ".concat(process.env.PORT));
});
exports.default = app;

import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import usersRouter from './routes/userRoutes';
import productsRouter from './routes/productsRoutes';
import ordersRouter from './routes/ordersRoutes';
import cors from 'cors';
dotenv.config();

const app: express.Application = express();

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

app.get('/', function (_req: Request, res: Response) {
  res.send('Store Front - Backend Project');
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).send(`Error,${error}`);
});

app.listen(process.env.PORT, function () {
  // eslint-disable-next-line no-console
  console.log(`starting app on: ${process.env.PORT}`);
});

export default app;

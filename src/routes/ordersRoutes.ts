import express, { Request, Response } from 'express';
const router = express.Router();
import { orderStore } from '../models/order';
import verifyToken from '../middlewares/verifyToken';

const store = new orderStore();
router.use(express.json());

router.get('/:user_id', verifyToken, async (req: Request, res: Response) => {
  try {
    const user_id = parseInt(req.params.user_id as string);
    if (!user_id) return res.send('Please Provide a User Id in params (/orders/userId)');
    const result = await store.currentOrders(user_id);
    if (!result.length) return res.send('You Currently Have No Orders');
    res.json(result);
  } catch (e) {
    throw new Error(`Couldnt get current orders ${e}`);
  }
});

router.get('/', (_req, res: Response) => {
  res.send('Please Provide a User Id in params (/orders/userId)');
});

router.post('/:user_id', verifyToken, async (req: Request, res: Response) => {
  try {
    const user_id = parseInt(req.params.user_id as string);
    const product_id = parseInt(req.body.product_id as string);
    const quantity = parseInt(req.body.quantity as string);
    if (!user_id) return res.send('Please Provide a User Id in params (/orders/userId)');
    if (!product_id)
      return res.send('Please Provide a Product Id in Request Body (/orders/userId)');
    const result = await store.createOrder(user_id, product_id, quantity);
    res.json(result);
  } catch (e) {
    throw new Error(`Couldnt Place The New orders ${e}`);
  }
});

export default router;

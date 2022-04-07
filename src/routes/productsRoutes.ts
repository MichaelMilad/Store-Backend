import express, { Request, Response } from 'express';
const router = express.Router();
import { productStore } from '../models/product';
import verifyToken from '../middlewares/verifyToken';

const store = new productStore();
router.use(express.json());

//Showing All Products(index) :
router.get('/', async (req, res: Response) => {
  try {
    const category = req.query.category as string;
    const result = await store.index(category);
    if (result === null) return res.send('No Products Under This Category');
    res.json(result);
  } catch (e) {
    throw new Error(`Couldn't show products \n ${e}`);
  }
});

//Creating a new Product :
router.post('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const { name, price, category } = req.body;
    const result = await store.create(name as string, price as number, category as string);
    res.json(result);
  } catch (e) {
    throw new Error(`Couldn't Create new product \n ${e}`);
  }
});

//Showing Specific Product :
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const result = await store.show(id);
    res.json(result);
  } catch (e) {
    throw new Error(`Couldn't show product \n ${e}`);
  }
});

//Deleting a Product :
router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const result = await store.delete(id);
    res.json(result);
  } catch (e) {
    throw new Error(`Couldn't delete product \n ${e}`);
  }
});

export default router;

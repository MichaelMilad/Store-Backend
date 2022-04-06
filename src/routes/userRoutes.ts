import express, { Request, Response } from 'express';
const router = express.Router();
import { userStore } from '../models/user';
import verifyToken from '../middlewares/verifyToken';

const store = new userStore();
router.use(express.json());

//Showing All Users(index) :
router.get('/', verifyToken, async (req, res: Response) => {
  const result = await store.index();
  res.json(result);
});

//Creating a new user :
router.post('/', async (req: Request, res: Response) => {
  const { firstName, lastName, password } = req.body;
  const token = await store.create(firstName as string, lastName as string, password as string);
  res.header('token', token as string);
  res.json({ token: token });
});

//Showing Specific User :
router.get('/:id', verifyToken, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const result = await store.show(id);
  res.json(result);
});

//Deleting User :
router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const result = await store.delete(id);
  res.json(result);
});

router.post('/login', async (req: Request, res: Response) => {
  const firstName = req.body.firstName as string;
  const lastName = req.body.lastName as string;
  const password = req.body.password as string;
  const token = await store.login({ firstName, lastName, password });
  if (token === 'Invalid Credentials') return res.send(token);
  res.header('token', token).json({ message: 'Logged In' });
});

export default router;

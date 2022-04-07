import express, { Request, Response } from 'express';
const router = express.Router();
import { userStore } from '../models/user';
import verifyToken from '../middlewares/verifyToken';

const store = new userStore();
router.use(express.json());

//Showing All Users(index) :
router.get('/', verifyToken, async (req, res: Response) => {
  try {
    const result = await store.index();
    res.json(result);
  } catch (e) {
    throw new Error(`Couldn't show users ${e}`);
  }
});

//Creating a new user :
router.post('/', async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, password } = req.body;
    const result = await store.create(firstname as string, lastname as string, password as string);
    const token = result[1];
    res.header('token', token as string);
    res.json(result[0]);
  } catch (e) {
    throw new Error(`Couldn't create New User ${e}`);
  }
});

//Showing Specific User :
router.get('/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const result = await store.show(id);
    res.json(result);
  } catch (e) {
    throw new Error(`Couldn't show user ${e}`);
  }
});

//Deleting User :
router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const result = await store.delete(id);
    res.json(result);
  } catch (e) {
    throw new Error(`Couldn't Delete user ${e}`);
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const firstname = req.body.firstname as string;
    const lastname = req.body.lastname as string;
    const password = req.body.password as string;
    const result = await store.login({ firstname, lastname, password });
    const token = result[1];
    if (result === 'Invalid Credentials') return res.send(result);
    res.header('token', token).json(result[0]);
  } catch (e) {
    throw new Error(`Couldn't Login ${e}`);
  }
});

export default router;

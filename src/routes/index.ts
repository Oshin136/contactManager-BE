import { Router } from 'express';

import userRoutes from './userRoutes';
import loginRoutes from './loginRoutes';
import contactRoutes from './contactRoutes';
import * as userController from '../controllers/userController';
import authenticate from '../middlewares/authenticate';

const router = Router();

router.use('/register',userController.createUser);
router.use('/login',loginRoutes);
router.use(authenticate);
router.use('/users', userRoutes);
router.use('/contacts',contactRoutes);

export default router;

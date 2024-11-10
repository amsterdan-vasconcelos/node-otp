import { Router } from 'express';
import { usersController } from '../controllers';

const router = Router();

router.post('/auth/signin', usersController.signIn);

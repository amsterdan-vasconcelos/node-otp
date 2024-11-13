import { Router } from 'express';
import { teste } from '../controllers';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const router = Router();

router.get('/private', ensureAuthenticated, teste.privateRoute);

export { router };

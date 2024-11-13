import { Router } from 'express';
import { usersController } from '../controllers';

const router = Router();

router.post(
  '/auth/signin',
  usersController.signInValidator,
  usersController.signIn,
);
router.post(
  '/auth/signup',
  usersController.signUpValidator,
  usersController.signUp,
);

router.post(
  '/auth/useotp',
  usersController.useOTPValidator,
  usersController.useOTP,
);

export { router };

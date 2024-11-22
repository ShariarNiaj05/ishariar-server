import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
// import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';

const router = express.Router();

router.post(
  '/login',
  // validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/refresh-token',
  // validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);
router.post(
  '/register',
  // validateRequest(AuthValidation.registerUserValidationSchema),
  AuthControllers.registerUser,
);

export const AuthRoutes = router;

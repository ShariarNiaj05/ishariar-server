import express from 'express';

const router = express.Router();

router.post(
  '/login',
  // validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

export const DemoRoutes = router;

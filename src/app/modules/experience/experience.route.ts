import express from 'express';

const router = express.Router();

router.post('/add-experience', AuthControllers.loginUser);

export const ExperienceRoutes = router;

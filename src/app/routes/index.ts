import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';

type TModuleRoutes = {
  path: string;
  route: Router;
};

const router = Router();

const moduleRoutes: TModuleRoutes[] = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  /*   {
    path: '/experiences',
    route: CategoryRoutes,
  },
  {
    path: '/projects',
    route: CategoryRoutes,
  },
  {
    path: '/blogs',
    route: CategoryRoutes,
  },
  {
    path: '/skills',
    route: CategoryRoutes,
  }, */
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

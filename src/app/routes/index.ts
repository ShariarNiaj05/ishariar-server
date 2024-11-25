import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';
import { ExperienceRoutes } from '../modules/experience/experience.route';
import { ProjectsRoutes } from '../modules/projects/projects.route';
import { SkillsRoutes } from '../modules/skills/skills.route';

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
  {
    path: '/experiences',
    route: ExperienceRoutes,
  },
  {
    path: '/projects',
    route: ProjectsRoutes,
  },
  {
    path: '/skills',
    route: SkillsRoutes,
  },
  /*{
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

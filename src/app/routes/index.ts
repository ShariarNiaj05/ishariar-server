import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';
import { ExperienceRoutes } from '../modules/experience/experience.route';
import { ProjectsRoutes } from '../modules/projects/projects.route';
import { SkillsRoutes } from '../modules/skills/skills.route';
import { BlogsRoutes } from '../modules/blogs/blogs.route';

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
  {
    path: '/blogs',
    route: BlogsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

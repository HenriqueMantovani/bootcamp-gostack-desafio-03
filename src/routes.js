import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Passa o metodo Store da class UserController
// routes.post('/users', UserController.store);
// routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

export default routes;

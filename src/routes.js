import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

// Controller
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

// Passa o metodo Store da class UserController
routes.post('/recipients', authMiddleware, RecipientController.store);
routes.post('/sessions', SessionController.store);

export default routes;

import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

// Controllers
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/recipients', authMiddleware, RecipientController.store);
routes.put('/recipients', authMiddleware, RecipientController.update);

routes.post('/sessions', SessionController.store);

export default routes;

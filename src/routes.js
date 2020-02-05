import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

// Controllers
import RecipientController from './app/controllers/RecipientController';
import DeliveryController from './app/controllers/DeliverymenController';
import FileController from './app/controllers/FileController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();
const upload = multer(multerConfig);

// Destinatários
routes.post('/recipients', authMiddleware, RecipientController.store);
routes.put('/recipients', authMiddleware, RecipientController.update);

// Entregadores
routes.post('/deliverymen', authMiddleware, DeliveryController.store);

routes.post('/sessions', SessionController.store);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;

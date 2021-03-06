import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

// Controllers
import RecipientController from './app/controllers/RecipientController';
import Delivery from './app/controllers/DeliveryController';
import DeliveryMenController from './app/controllers/DeliveryMenController';
import FileController from './app/controllers/FileController';
import SessionController from './app/controllers/SessionController';
import SignatureController from './app/controllers/SignatureController';

const routes = new Router();
const upload = multer(multerConfig);

// Sessão
routes.post('/sessions', SessionController.store);

// Destinatários
routes.post('/recipients', authMiddleware, RecipientController.store);
routes.put('/recipients', authMiddleware, RecipientController.update);

// Entregadores
routes.post('/deliverymen', authMiddleware, DeliveryMenController.store);
routes.get('/deliverymen', authMiddleware, DeliveryMenController.index);
routes.put('/deliverymen/:id', authMiddleware, DeliveryMenController.update);
routes.delete('/deliverymen/:id', authMiddleware, DeliveryMenController.delete);

// Pedidos
routes.post('/deliveries', authMiddleware, Delivery.store);
// routes.get('/deliverymen', authMiddleware, DeliveryController.index);
// routes.put('/deliverymen/:id', authMiddleware, DeliveryController.update);
// routes.delete('/deliverymen/:id', authMiddleware, DeliveryController.delete);

routes.post('/files', upload.single('file'), FileController.store);
routes.post(
  '/signatures',
  upload.single('signature'),
  SignatureController.store
);

export default routes;

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

// Sessão
routes.post('/sessions', SessionController.store);

// Destinatários
routes.post('/recipients', authMiddleware, RecipientController.store);
routes.put('/recipients', authMiddleware, RecipientController.update);

// Entregadores
routes.post('/deliverymen', authMiddleware, DeliveryController.store);
routes.get('/deliverymen', authMiddleware, DeliveryController.index);
routes.put('/deliverymen/:id', authMiddleware, DeliveryController.update);
routes.delete('/deliverymen/:id', authMiddleware, DeliveryController.delete);

// Pedidos
// routes.post('/deliverymen', authMiddleware, DeliveryController.store);
// routes.get('/deliverymen', authMiddleware, DeliveryController.index);
// routes.put('/deliverymen/:id', authMiddleware, DeliveryController.update);
// routes.delete('/deliverymen/:id', authMiddleware, DeliveryController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;

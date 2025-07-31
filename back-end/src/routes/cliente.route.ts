import { Router } from 'express';
import Container from 'typedi';
import { ClienteController } from '../controllers/cliente.controller';

const router = Router();
const clienteController = Container.get(ClienteController);

router
  .get('/get-by-email/:email', clienteController.getByEmail.bind(clienteController))
  .get('/get-by-id/:id', clienteController.getById.bind(clienteController))
  .post('/create', clienteController.create.bind(clienteController))
  .put('/update/:id', clienteController.update.bind(clienteController))
  .get('/get-all', clienteController.getAll.bind(clienteController))
  .put('/disable/:id', clienteController.disable.bind(clienteController))
  .put('/active/:id', clienteController.active.bind(clienteController));

export const clienteRoute = router;

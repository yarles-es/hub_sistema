import { Router } from 'express';
import Container from 'typedi';
import { MensalidadeController } from '../controllers/mensalidade.controller';

const router = Router();

const mensalidadeController = Container.get(MensalidadeController);

router
  .get('/get-by-id/:id', mensalidadeController.getById.bind(mensalidadeController))
  .get('/get-by-cliente/:clienteId', mensalidadeController.getByClienteId.bind(mensalidadeController))
  .post('/create', mensalidadeController.create.bind(mensalidadeController))
  .put('/pay/:id', mensalidadeController.payMensalidade.bind(mensalidadeController))
  .delete('/delete/:id', mensalidadeController.delete.bind(mensalidadeController))
  .get('/get-all', mensalidadeController.getAll.bind(mensalidadeController));

export const mensalidadeRoute = router;

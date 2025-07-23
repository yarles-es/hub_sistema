import { Router } from 'express';

import Container from 'typedi';
import { UsuarioController } from '../controllers/usuario.controller';

const router = Router();
const usuarioController = Container.get(UsuarioController);

router
  .get('/get-by-id/:id', usuarioController.getById.bind(usuarioController))
  .get('/get-by-email/:email', usuarioController.getByEmail.bind(usuarioController))
  .post('/create', usuarioController.create.bind(usuarioController))
  .put('/update/:id', usuarioController.update.bind(usuarioController))
  .put('/disable/:id', usuarioController.disable.bind(usuarioController));

export const usuarioRoute = router;

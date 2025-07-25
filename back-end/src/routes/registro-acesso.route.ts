import { Router } from 'express';
import Container from 'typedi';
import { RegistroAcessoController } from '../controllers/registro-acesso.controller';

const router = Router();
const registroAcessoController = Container.get(RegistroAcessoController);

router.get('/get-all', registroAcessoController.getAll.bind(registroAcessoController));

export const registroAcessoRoute = router;

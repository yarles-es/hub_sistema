import { Router } from 'express';
import Container from 'typedi';
import { RegistroAcessoController } from '../controllers/registro-acesso.controller';

const router = Router();
const registroAcessoController = Container.get(RegistroAcessoController);

router.get('/acessos-por-dia/:id', registroAcessoController.getAllForDay.bind(registroAcessoController));

export const registroAcessoRoute = router;

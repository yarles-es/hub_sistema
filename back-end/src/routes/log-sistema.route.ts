import { Router } from 'express';
import Container from 'typedi';
import { LogSistemaController } from '../controllers/log-sistema.controller';

const router = Router();
const logSistemaController = Container.get(LogSistemaController);

router.get('/get-all', logSistemaController.getLogs.bind(logSistemaController));

export const logSistemaRoute = router;

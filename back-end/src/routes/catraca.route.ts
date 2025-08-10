import { Router } from 'express';
import { Container } from 'typedi';
import { CatracaController } from '../controllers/catraca.controller';

const router = Router();

const catracaController = Container.get(CatracaController);

router.post('/webhook', catracaController.webhook.bind(catracaController));
router.get('/id-disponivel', catracaController.buscarIdDisponivel.bind(catracaController));
router.post('/iniciar-cadastro', catracaController.iniciarCadastroBiometria.bind(catracaController));

export const catracaRoute = router;

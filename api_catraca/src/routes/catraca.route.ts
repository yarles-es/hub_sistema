import { Router } from 'express';
import { Container } from 'typedi';
import { CatracaController } from '../controllers/catraca.controller';

const router = Router();

const catracaController = Container.get(CatracaController);

router.post('/webhook', catracaController.webhook.bind(catracaController));

export const catracaRoute = router;

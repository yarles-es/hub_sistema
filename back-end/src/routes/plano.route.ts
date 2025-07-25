import { Router } from 'express';
import { Container } from 'typedi';
import { PlanoController } from '../controllers/plano.controller';

const router = Router();
const planoController = Container.get(PlanoController);

router.post('/create', planoController.createPlano.bind(planoController));
router.get('/get-all', planoController.getAllPlanos.bind(planoController));
router.get('/get/:id', planoController.getPlanoById.bind(planoController));
router.put('/update/:id', planoController.updatePlano.bind(planoController));
router.delete('/delete/:id', planoController.deletePlano.bind(planoController));

export const planoRoute = router;

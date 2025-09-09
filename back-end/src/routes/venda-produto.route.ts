import { Router } from 'express';
import { Container } from 'typedi';
import { VendaProdutoController } from '../controllers/venda-produto.controller';

const router = Router();
const controller = Container.get(VendaProdutoController);

router.post('/create', controller.create.bind(controller));
router.delete('/delete/:id', controller.delete.bind(controller));
router.get('/all', controller.getAll.bind(controller));
router.get('/get-by-id/:id', controller.getById.bind(controller));

export const vendaProdutoRoute = router;

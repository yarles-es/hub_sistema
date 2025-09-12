import { Router } from 'express';
import { Container } from 'typedi';
import { ProdutoController } from '../controllers/produto.controller';

const router = Router();
const produtoController = Container.get(ProdutoController);

router.post('/create', produtoController.create.bind(produtoController));
router.get('/get-all', produtoController.getAll.bind(produtoController));
router.get('/get-by-id/:id', produtoController.getById.bind(produtoController));
router.put('/update/:id', produtoController.update.bind(produtoController));
router.delete('/delete/:id', produtoController.delete.bind(produtoController));

export const produtoRoute = router;

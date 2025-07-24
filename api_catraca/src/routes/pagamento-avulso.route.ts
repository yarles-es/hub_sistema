import { Router } from 'express';
import { Container } from 'typedi';
import { PagamentoAvulsoController } from '../controllers/pagamento-avulso.controller';

const pagamentoAvulsoController = Container.get(PagamentoAvulsoController);
const route = Router();

route.post('/create', pagamentoAvulsoController.create.bind(pagamentoAvulsoController));
route.get('/get-by-id/:id', pagamentoAvulsoController.getById.bind(pagamentoAvulsoController));
route.put('/update/:id', pagamentoAvulsoController.update.bind(pagamentoAvulsoController));
route.delete('/delete/:id', pagamentoAvulsoController.delete.bind(pagamentoAvulsoController));

export const pagamentoAvulsoRoute = route;

import { Router } from 'express';
import Container from 'typedi';
import { validateJWT } from '../middlewares/auth-login-middleware';
import { LoginMiddleware } from '../middlewares/login.middleware';
import { catracaRoute } from './catraca.route';
import { clienteRoute } from './cliente.route';
import { logSistemaRoute } from './log-sistema.route';
import { loginRoute } from './login.route';
import { mensalidadeRoute } from './mensalidade.route';
import { pagamentoAvulsoRoute } from './pagamento-avulso.route';
import { planoRoute } from './plano.route';
import { registroAcessoRoute } from './registro-acesso.route';
import { usuarioRoute } from './usuario.route';

const router = Router();

const loginMiddleware = Container.get(LoginMiddleware);

router.use('/login', loginMiddleware.execute.bind(loginMiddleware), loginRoute);

router.use(validateJWT);
router.use('/catraca', catracaRoute);

router.use('/cliente', clienteRoute);
router.use('/mensalidade', mensalidadeRoute);
router.use('/log-sistema', logSistemaRoute);
router.use('/registro-acesso', registroAcessoRoute);
router.use('/usuario', usuarioRoute);
router.use('/plano', planoRoute);
router.use('/pagamento-avulso', pagamentoAvulsoRoute);

export const routes = router;

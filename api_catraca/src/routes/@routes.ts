import { Router } from 'express';
import { validateJWT } from '../middlewares/auth-login-middleware';
import { catracaRoute } from './catraca.route';
import { clienteRoute } from './cliente.route';
import { logSistemaRoute } from './log-sistema.route';
import { loginRoute } from './login.route';
import { mensalidadeRoute } from './mensalidade.route';
import { registroAcessoRoute } from './registro-acesso.route';
import { usuarioRoute } from './usuario.route';

const router = Router();

router.use('/login', loginRoute);
router.use('/catraca', catracaRoute);

router.use(validateJWT);

router.use('/cliente', clienteRoute);
router.use('/mensalidade', mensalidadeRoute);
router.use('/log-sistema', logSistemaRoute);
router.use('/registro-acesso', registroAcessoRoute);
router.use('/usuario', usuarioRoute);

export const routes = router;

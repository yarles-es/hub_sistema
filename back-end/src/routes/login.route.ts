import { Router } from 'express';
import Container from 'typedi';
import { LoginController } from '../controllers/login.controller';

const router = Router();
const loginController = Container.get(LoginController);

router.post('/', loginController.login.bind(loginController));

export const loginRoute = router;

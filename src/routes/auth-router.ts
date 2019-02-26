import Router from 'koa-router';
import AuthController from '../controllers/auth.controller';

const authRouter: Router = new Router();

authRouter.post('/login', AuthController.login);
authRouter.post('/signup', AuthController.signup);
authRouter.get('/protected-route', AuthController.protectedRoute);

export default authRouter;
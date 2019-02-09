import Router from 'koa-router';
import UserController from '../controllers/user.controller';

const userRouter: Router = new Router();

userRouter.get('/user', UserController.getAllUsers);
userRouter.get('/user/:email', UserController.getUserByEmail);
userRouter.post('/user/create', UserController.createUser);

export default userRouter;
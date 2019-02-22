import Koa from 'koa';
import compose from 'koa-compose';

import authRouter from './auth-router';
import userRouter from './user-router';

const routerRoutes: Koa.Middleware = compose([
  authRouter.routes(),
  authRouter.allowedMethods(),
  userRouter.routes(),
  userRouter.allowedMethods()
]);
  
export default routerRoutes;
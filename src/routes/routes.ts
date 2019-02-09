import Koa from 'koa';
import compose from 'koa-compose';

import helloRouter from './hello-router';
import userRouter from './user-router';

const routerRoutes: Koa.Middleware = compose([
  helloRouter.routes(), 
  helloRouter.allowedMethods(), 
  userRouter.routes(),
  userRouter.allowedMethods()
]);
  
export default routerRoutes;
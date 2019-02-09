import Router from 'koa-router';

const helloRouter: Router = new Router();

helloRouter.get('/', async ctx => {
  ctx.body = { 
    status: 200, 
    message: 'Hello Koa.js TypeScript' 
  }
});

helloRouter.get('/hello/:id', async ctx => {
  const { id } = ctx.params;
  ctx.body = 'Hello ' + id;
});

export default helloRouter;
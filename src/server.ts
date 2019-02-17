import chalk from 'chalk';
import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import jwt from 'koa-jwt';
import logger from 'koa-logger';

require('dotenv').config();
import routerRoutes from './routes/routes';

const app = new Koa();
const log = console.log;

process.env.NODE_ENV = process.env.ENVIRONMENT;
app.env = process.env.NODE_ENV;
app.use(bodyparser({
  onerror: function (err, ctx) {
    ctx.throw('body parse error', 422);
  }
}));
app.use(cors());
app.use(logger());
app.use(helmet());

app.use(async (ctx, next) => {
  if (typeof ctx.request.body === 'string') {
    ctx.request.body = JSON.parse(ctx.request.body);
  }
  await next();
});

app.use(async (ctx, next) => {
  ctx.body = ctx.request.body;
  await next();
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      message: err.message
    }
    ctx.app.emit('error', err, ctx);
  }
});

app.on('error', (err, ctx) => {
  log(chalk.blue('status code: '), chalk.yellow(ctx.status));
  log(chalk.red('error message:'), chalk.bgRed(err.message));
})

app.use(routerRoutes);

const port = process.env.PORT || 3000;

app.listen(port);
log(`listening on port ${port}`);

export default app;
import chalk from 'chalk';
import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import jwt from 'koa-jwt';
import logger from 'koa-logger';
require('dotenv').config();
import routerRoutes from '../routes/routes';

const app: Koa = new Koa();
const log = console.log;

app.env = process.env.ENVIRONMENT;
app.use(bodyparser());
app.use(cors());
app.use(logger());
app.use(helmet());

app.use(async function handleErrors(ctx, next) {
    try {
        await next();
    } catch (err) {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message
        };
        ctx.app.emit('error', err, ctx);
    }
});

app.on('error', (err, ctx) => {
    log(chalk.blue('status code: '), chalk.yellow(ctx.status));
    log(chalk.red('error message:'), chalk.bgRed(err));
    log(chalk.green(err.body));
})

app.use(routerRoutes);

app.listen(process.env.PORT);
log(`listening on port ${process.env.PORT || 3000}`);

module.exports = app;
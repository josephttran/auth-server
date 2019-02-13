import { IDbConfig } from '../interfaces/interfaces';
import env from './env';

const { host, port, user, password, database, charset } = env;

const config: IDbConfig = {
  host: host,
  port: port,
  user: user,
  password: password,
  database: database,
  charset: charset,
}

export default config;
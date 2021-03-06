import mysql from 'mysql2/promise';

import config from './config';
import { IDbConfig, IDatabase } from '../interfaces/interfaces';

class Database implements IDatabase {
  config: IDbConfig;

  constructor(cfg: IDbConfig) {
    this.config = cfg;
  }
  
  async createConnectionPool(): Promise<mysql.Pool>{
    try {
      const pool: mysql.Pool = await mysql.createPool(this.config);
      
      console.log('Success create pool');
      return pool;
    } catch(err) {
      console.log('Failed create pool', err);
    }
  }
  
  /* Using Pool.query() automatically close Pool */
}

export default new Database(config);
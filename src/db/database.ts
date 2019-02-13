import mysql from 'mysql2/promise';

import config from './config';
import { IDbConfig, IDatabase } from 'src/interfaces/interfaces';

class Database implements IDatabase {
  config: IDbConfig;
  connectionPool: mysql.Pool;

  constructor() {
    this.config = config;
  }
  
  async createConnectionPool(): Promise<mysql.Pool>{
    try {
      const pool = await mysql.createPool(this.config);
      
      this.connectionPool = pool;
      console.log('Success create pool');
      return this.connectionPool;
    } catch(err) {
      console.log('Failed create pool', err);
    }
  }
  
  async closeConnectionPool(): Promise<void> {
    try {
      await this.connectionPool.end;
    } catch(err) {
      console.log('Close pool error:', err);
    }    
  }
}

export default Database;
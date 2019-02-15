import mysql from 'mysql2/promise';
import { IDbConfig } from '../src/interfaces/interfaces';

import Database from '../src/db/database';

describe('Database', () => {
  const database = new Database();

  test('Should be an instance of Database', () => {
    expect(database).toBeInstanceOf(Database);
  });
  
  test('Should set database config', async () => {
    const config: IDbConfig = database.config;
    
    expect(Object.keys(database)).toEqual(expect.arrayContaining(['config']));
    expect(config).toBeDefined();
    expect(Object.keys(config)).toEqual(expect.arrayContaining(['host', 'user', 'password', 'database']));
    expect(config).toHaveProperty('charset', 'utf8mb4');
  });
});

describe('Pool', () => {
  const database = new Database();
  let pool: mysql.Pool;
  
  async function createNewPool() {
    pool = await database.createConnectionPool();
  }
  
  beforeAll(() => {
    createNewPool();
  });
  
  test('Should have pool', async () => {
    expect(pool).toBeDefined();
    expect(Object.keys(pool)).toMatchObject(expect.arrayContaining(['pool', 'Promise']));
  });
  
  test('Pool can connect', async () => {
    const poolConnection: mysql.PoolConnection = await pool.getConnection();
    
    expect(poolConnection).toBeDefined();
    expect(Object.keys(poolConnection)).toMatchObject(expect.arrayContaining(['connection', 'Promise']));
  });
});
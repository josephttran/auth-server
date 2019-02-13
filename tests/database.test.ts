import Database from '../src/db/database';

describe('Database', () => {
  const database = new Database();

  test.skip('Should be an instance of Database', () => {
    expect(database).toBeInstanceOf(Database);
  });
  
  test.skip('Should set database config', () => {
    const config = database.config;

    expect(config).toBeDefined();
    expect(Object.keys(config)).toEqual(expect.arrayContaining(['host', 'user', 'password', 'database']));
    expect(config).toHaveProperty('charset', 'utf8mb4');
  });
});

describe('Pool', () => {
  let database = new Database();

  beforeEach(() => {
    database = new Database();
  })

  test('Should return a Pool', async () => {   
    const pool = await database.createConnectionPool();
    
    expect(Object.keys(database)).toEqual(expect.arrayContaining(['config', 'connectionPool']));
    expect(database.connectionPool).toBeDefined();
    expect(pool).toBeDefined();
    expect(Object.keys(pool)).toMatchObject(expect.arrayContaining(['pool', 'Promise']));
  });

  test('Pool can connect', async () => {
    const pool = await database.createConnectionPool();
    const poolConnection = await pool.getConnection();
    
    expect(poolConnection).toBeDefined();
    expect(Object.keys(poolConnection)).toMatchObject(expect.arrayContaining(['connection', 'Promise']));
  });
})
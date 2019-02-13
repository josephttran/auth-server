require('dotenv').config();

function getDatabaseName(): string {
  let database: string;
  let environment: string;

  if(process.env.NODE_ENV === 'test') {
    environment = 'test'
  } else {
    environment = process.env.ENVIRONMENT
  }

  switch(environment) {
    case 'test':
      database = process.env.DB_TEST_DATABASE;
      break;
    case 'production':
      database = process.env.DB_TEST_DATABASE;
      break;
    default:
      database = process.env.DB_DATABASE;
  }

  return database;
}

const env = {
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: getDatabaseName(),
  charset: process.env.DB_CHARSET,
}

export default env;
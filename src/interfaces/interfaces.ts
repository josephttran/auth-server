import mysql from 'mysql2/promise';

export interface IDbConfig {
  host: string;
  port?: number;
  user: string;
  password: string;
  database?: string;
  charset?: string;
  waitForConnections?: boolean;
  connectionLimit?: number;
  queueLimit?: number;
}

export interface IDatabase {
  createConnectionPool: () => Promise<mysql.Pool>;
  closeConnectionPool: () => Promise<void>;
}

export interface IModel {
  table: string;
  
  createUserTable: () => void;
  createUser: (user: object) => void;
  getAll: (table: string) => Promise<Array<object>>;
  getUserByEmail: (table: string, email: string) => Promise<object>;   
}


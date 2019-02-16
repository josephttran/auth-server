import mysql, { OkPacket } from 'mysql2/promise';
import Database from '../db/database';

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
}

export interface IUser {
  user_id?: number,
  firstName: string,
  lastName: string, 
  email: string,
  password: string
}

export interface IModel {
  db: Database;
  table: string;
  
  createUserTable: () => void;
  createUser: (user: object) => Promise<OkPacket>;
  getAll: (table: string) => Promise<Array<IUser>>;
  getUserByEmail: (table: string, email: string) => Promise<IUser>;   
}

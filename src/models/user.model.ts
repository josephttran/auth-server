import mysql, { OkPacket, FieldPacket } from 'mysql2/promise';

import { IModel, IUser } from '../interfaces/interfaces';
import Database from '../db/database';


class UserModel implements IModel {
  table: string = 'users';
  db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async createUserTable() {
    const createTable = `CREATE TABLE IF NOT EXISTS ${this.table}(
        user_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        firstName VARCHAR(40) NOT NULL,
        lastName VARCHAR(40) NOT NULL,
        email VARCHAR(90) NOT NULL UNIQUE KEY,
        password VARCHAR(64) NOT NULL
    )`;

    try {
      const pool = await this.db.createConnectionPool();

      await pool.query(createTable);
    } catch(err) {
      throw new Error(err.message);
    }
  }
  
  /* use prepared statement */
  async createUser(user: IUser): Promise<OkPacket> {
    try {
      const pool: mysql.Pool = await this.db.createConnectionPool();
      const sql = `INSERT INTO ${this.table} SET firstName=?, lastName=?, password=?, email=?`;
      const value = [user.firstName, user.lastName, user.password, user.email]
      const result: [OkPacket, FieldPacket[]] = await pool.execute(sql, value);

      return result[0];
    } catch(err) {
      console.log(err.message);
      throw new Error(`user with email ${user.email} already exist`);
    }
  }

  /* result[0] is an array of object row with columns as keys */
  async getAll(): Promise<Array<IUser>> {
    try {
      const sql = `SELECT * FROM ${this.table}`;
      const pool: mysql.Pool = await this.db.createConnectionPool();
      const result: [any, FieldPacket[]] = await pool.query(sql);

      return result[0];
    } catch(err) {
      throw new Error('Error get all: ' + err.message);
    }
  }

  async getUserByEmail(email: string): Promise<IUser> {
    try {
      const sql = `SELECT * FROM ${this.table} WHERE email=?`;
      const pool: mysql.Pool = await this.db.createConnectionPool();
      const result: [any, FieldPacket[]] = await pool.execute(sql, [email]);
      
      if (!result[0].length) {
        throw new Error(`User with email ${email} not found`);
      } 

      const user: IUser = result[0][0];

      return user;
    } catch(err) {
      throw new Error(err.message); // return Promise.reject(new Error(err.message));
    }
  }
}

export default UserModel;
import { OkPacket } from 'mysql2/promise';

import { IUser } from '../src/interfaces/interfaces';
import Database from '../src/db/database';
import UserModel from '../src/models/user.model'

describe('UserModel', () => {
  const userModel = new UserModel(Database);

  test('database of user model is defined', () => {
    expect(userModel.db).toBeDefined();
  })

  test('table name is users', () => {
    expect(userModel.table).toBe('users');
  })
});

describe('User model methods', () => {
  const userModel = new UserModel(Database);
  
  it('should create user table', async () => {
      await userModel.createUserTable();
  });

  it('should create new user', async () => {
    const user: IUser = {
      firstName: 'Alice',
      lastName: 'Bob',
      password: 'Eve',
      email: `alicebob${Math.floor(Math.random()*1000)}eve@dev.com`
    };
    let okPacket: OkPacket;

    try {
      okPacket = await userModel.createUser(user);
    } catch(err) {
      console.log('Should not have catch error');
    } finally {
      expect(okPacket.affectedRows).toBe(1);
    }
  });

  it('should throw error when email exist', async () => {
    const user: IUser = {
      firstName: 'Alice',
      lastName: 'Bob',
      password: 'Eve',
      email: 'alicebobeve@dev.com'
    };

    try {
      await userModel.createUser(user);
    } catch(err) {
      expect(err.message).toBe(`user with email alicebobeve@dev.com already exist`);
    }
  });

  it('should get all from user table', async () => {
    let result: IUser[];

    try {
      result = await userModel.getAll();
    } catch(err) {
      console.log('Should not have catch error');
    } finally {
      if (!result.length) {
        expect(result).toHaveLength(0);
      } else {
        result.forEach(obj => {
          expect(result.length).toBeGreaterThanOrEqual(1);
          expect(Object.keys(obj))
            .toEqual(expect.arrayContaining(['user_id', 'firstName', 'lastName', 'password', 'email']));
        });
      }
    }
  });

  it('should get user by email', async () => {
    let result: IUser;
    const testEmail = 'alicebobeve@dev.com';

    try {
      result = await userModel.getUserByEmail(testEmail);
    } catch(err) {
      console.log('Should not have catch error');
    } finally {
      expect(Object.keys(result)).toHaveLength(5);
      expect(Object.keys(result))
        .toEqual(expect.arrayContaining(['user_id', 'firstName', 'lastName', 'password', 'email']));
      expect(result.firstName).toBe('Alice')
      expect(result.email).toBe(testEmail);
    }
  });
  
  it('get user by email should throw error', async () => {
    const testEmail = 'failEmail@dev.com';
  
    await expect(userModel.getUserByEmail(testEmail)).rejects.toThrow(`User with email ${testEmail} not found`);
  });
});
import Koa from 'koa';

import { IUser } from '../interfaces/interfaces'
import Database from '../db/database';
import UserModel from '../models/user.model';

const userModel = new UserModel(Database);

class UserController {
  static async createUser(ctx: Koa.Context) {
    try {
      const user: IUser = {
        firstName: ctx.request.body.firstName,
        lastName: ctx.request.body.lastName,
        password: ctx.request.body.password,
        email: ctx.request.body.email
      }
      const okPacket = await userModel.createUser(user);

      if(okPacket.affectedRows === 1) {
        ctx.response.status = 201;
        ctx.response.body = {
          email: user.email
        };
      }
    } catch(err) {
      ctx.throw(400, 'Bad Request');
      throw new Error(err.message);
    }
  }
  
  static async getAllUsers(ctx: Koa.Context)  {
    try {     
      const result = await userModel.getAll();
      ctx.response.body = result;
    } catch(err) {
      throw new Error(err.message);
    }
  }

  static async getUserByEmail(ctx: Koa.Context) {
    try {
      const result = await userModel.getUserByEmail(ctx.params.email);
      ctx.response.body = result;
    } catch(err) {
      throw new Error(err.message);
    }
  }
}

export default UserController;
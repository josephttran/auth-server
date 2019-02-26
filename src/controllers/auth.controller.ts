import Koa from 'koa';

import Database from '../db/database';
import UserModel from '../models/user.model';
import { jwtService, bcryptService } from '../services/auth.service';

const db = new Database();
const userModel = new UserModel(db);

class AuthController {
  static async login(ctx: Koa.Context, next: Function): Promise<void> {
      const user = await userModel.getUserByEmail(ctx.request.body.email);
      const pwMatch: boolean = await bcryptService.compare(ctx.request.body.password, user.password);

      if (user && pwMatch) {     
        const token = await jwtService.createToken(user);
        ctx.status = 302;
        ctx.redirect('/protected-route');
        ctx.body = {
          email: user.email,
          token: token
        }
      } else {
        throw new Error('Authentication Error');
      }
  }

  static async protectedRoute(ctx: Koa.Context, next: Function): Promise<void> {
    try {
      const token = ctx.request.headers['authorization'];

      ctx.state.user = await jwtService.verifyToken(token);
      ctx.status = 200;
      ctx.body = ctx.state.user;
    } catch(err) {
      throw new Error('Authentication Error');
    }
  } 
  
  static async signup(ctx: Koa.Context): Promise<void> {
      const hashpw = await bcryptService.hash(ctx.request.body.password);
      const user = {
        firstName: ctx.request.body.firstName,
        lastName: ctx.request.body.lastName,
        password: hashpw,
        email: ctx.request.body.email
      }

      const okPacket = await userModel.createUser(user);

      if(okPacket.affectedRows === 1) {
        const token = await jwtService.createToken(user);
        
        ctx.status = 302;
        ctx.redirect('/protected-route');
        ctx.body = {
          user: user.email,
          token: token
        }
      } else {
        throw new Error(`Fail create ${user.email}`);
      }
  }
}

export default AuthController;
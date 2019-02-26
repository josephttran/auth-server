import jwt from 'jsonwebtoken';
import bcrypt, { compare } from 'bcrypt';

require('dotenv').config();
import { IUser } from '../interfaces/interfaces';

export class jwtService {
  static async createToken(user: IUser): Promise<string> {
    try {
      const secret = process.env.JWT_SECRET;
      const expiresIn = process.env.JWT_EXPIRATION;
      const payload = { id: user.user_id, email: user.email };
      const token = await jwt.sign(payload, secret, { expiresIn });
  
      return token;      
    } catch(err) {
      throw err.message;
    }
  }

  static async verifyToken(token: string): Promise<object | string> {
    try {
      const decoded = await jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);

      return decoded;
    } catch(err) {
      throw err.message;
    }
  }
}

export class bcryptService {
  static async hash(plaintext: string): Promise<string> {
    try {
      const hashedText =  await bcrypt.hash(plaintext, 10);
      
      return hashedText;
    } catch(err) {
      throw err.message;
    }
  }

  static async compare(plaintext: string, hashedText: string): Promise<boolean> {
    try {
      const doMatch = await compare(plaintext, hashedText);

      return doMatch;
    } catch(err) {
      throw err.message;
    }
  }
}

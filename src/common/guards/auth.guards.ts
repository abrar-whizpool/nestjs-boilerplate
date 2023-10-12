import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Connection } from 'typeorm';


@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly connection: Connection) { }
  //Token Guard
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      throw new HttpException('Token not Found', HttpStatus.UNAUTHORIZED);
    }
    try {
      const token = request.headers.authorization.split(' ')[1];

      const user = await admin.auth().verifyIdToken(token);

      if (!user) {
        throw new UnauthorizedException();
      }

      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}

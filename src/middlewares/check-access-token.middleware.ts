import { Injectable } from '@nestjs/common';
import { Response, NextFunction } from 'express';

import { IRequest } from '../interfaces';
import { JwtService } from '../modules/jwt/jwt.service';


@Injectable()
export class CheckAccessTokenMiddleware {
  constructor(private readonly jwtService: JwtService) { }

  use(req: IRequest, res: Response, next: NextFunction) {
    const accessToken = req.headers.authorization.replace('Bearer ', '');

    const verified = this.jwtService.verifyToken(accessToken);
    req.user.guid = verified.guid;

    next();
  }
}

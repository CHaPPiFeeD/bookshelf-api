import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserRepository } from 'src/repositories/user.repository';
import * as jwt from '../helpers/jwt.helper';


@Injectable()
export class UserCreatingGuard implements CanActivate {
  constructor(
    private userRepository: UserRepository,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();

    try {
      const payload = jwt.decode(token);
      if (!payload) throw new UnauthorizedException();
      request.remote_user = payload;
    } catch {
      throw new UnauthorizedException();
    }

    const { sub, email, name } = request.remote_user;
    request.user = await this.userRepository.getOrCreateUser({ id: sub, email, name });

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

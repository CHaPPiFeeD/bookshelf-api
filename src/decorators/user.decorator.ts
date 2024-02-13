import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IRequest } from 'src/types';


export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext): any => {
    const request = ctx.switchToHttp().getRequest() as IRequest;
    const user = request.user;

    return data ? user?.[data] : user;
  },
);

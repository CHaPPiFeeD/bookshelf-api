import { createParamDecorator, ExecutionContext } from '@nestjs/common';


export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext): { userGuid: string } => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);

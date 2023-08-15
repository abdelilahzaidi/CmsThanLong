import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from 'src/common/entities/User/UserEntity';

export const CurrentUser = createParamDecorator(
  (data, ctx: ExecutionContext) :  UserEntity => {
    const request = ctx.switchToHttp().getRequest();    
    return  request.user;
  },
);
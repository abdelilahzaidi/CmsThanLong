import { UserService } from './../modules/user/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/common/entities/User/UserEntity';
import { Repository } from 'typeorm';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
        private readonly userService : UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '14101983',
    });
  }

  async validate(payload) {

    const {id}=payload;

    const user = await this.userService.findOneById(id);

    if(!user){
        throw new UnauthorizedException('Login first to access this resource.')
    }

    return user
  }
}
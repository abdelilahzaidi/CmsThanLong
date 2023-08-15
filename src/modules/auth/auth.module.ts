import { LevelModule } from './../level/level.module';
import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/shared/jwt.strategy';
import { RoleModule } from '../role/role.module';

@Module({
  imports:[
    
    PassportModule.register({
      defaultStrategy :'jwt'
    }),
    JwtModule.register({
          secret:'14101983',
          signOptions : {expiresIn:'1d'}
          })
    ,
    forwardRef(() => UserModule),
    forwardRef(()=>RoleModule),
    forwardRef(()=>LevelModule)
    
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports:[AuthService,JwtStrategy,PassportModule]
})
export class AuthModule {}

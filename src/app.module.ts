import { ProgramModule } from './modules/program/program.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BdModule } from './common/BD/bd.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { LevelModule } from './modules/level/level.module';
@Module({
  imports: [BdModule,AuthModule,UserModule,RoleModule,LevelModule,ProgramModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

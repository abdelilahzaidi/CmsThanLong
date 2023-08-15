import { ProgramEntity } from './../../common/entities/program/ProgramEntity';
import { Module } from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramController } from './program.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([ProgramEntity])],
  providers: [ProgramService],
  controllers: [ProgramController],
  exports:[ProgramService]
})
export class ProgramModule {}

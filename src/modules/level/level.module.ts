
import { Module } from '@nestjs/common';
import { LevelController } from './level.controller';
import { LevelService } from './level.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelEntity } from 'src/common/entities/level/LevelEntity';

@Module({
  imports:[
    TypeOrmModule.forFeature([LevelEntity])
  ],
  controllers: [LevelController],
  providers: [LevelService],
  exports:[LevelService]
})
export class LevelModule {}

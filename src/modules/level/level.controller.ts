import { Body,Get, Post, Controller } from '@nestjs/common';
import { LevelEntity } from 'src/common/entities/level/LevelEntity';
import { LevelService } from './level.service';
import { LevelCreateDTO } from 'src/common/dto/role/level-create.dto';

@Controller('level')
export class LevelController {
    constructor(
        private readonly levelService : LevelService
    ){}
    @Get('')
    async getAllRoles(): Promise<LevelEntity[]> {
        return this.levelService.all();
    }

    @Post('')
    async createRole(@Body() levelDto: LevelCreateDTO): Promise<LevelEntity | null> {
        return this.levelService.create(levelDto);
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelEntity } from 'src/common/entities/level/LevelEntity';
import { Repository } from 'typeorm';

@Injectable()
export class LevelService {
    constructor(
        @InjectRepository(LevelEntity) private readonly levelRepository:Repository<LevelEntity>
    ){}

    //get all level
    async all():Promise<LevelEntity[]>{
        return await this.levelRepository.find();
    }


    //Create a user
    async create(data):Promise<LevelEntity | null>{
        return await this.levelRepository.save(data);
    }

    async findOneById(id: number): Promise<LevelEntity> {
        return this.levelRepository.findOne({where:{id}});
    }
    
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/common/entities/User/UserEntity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository:Repository<UserEntity>,
        
       
        ){}

    //get all user
    async all():Promise<UserEntity[]>{
        return await this.userRepository.find();
    }


    //Create a user
    async create(data):Promise<UserEntity | null>{
        return await this.userRepository.save(data);
    }












    async findOne(email : string): Promise<UserEntity> {
        return this.userRepository.findOne({where:{email}});
    }

    async findOneById(id : number): Promise<UserEntity> {
        return this.userRepository.findOne({where:{id}});
    }

    
}

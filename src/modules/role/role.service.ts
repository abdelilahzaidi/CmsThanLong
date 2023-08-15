import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleCreateDTO } from 'src/common/dto/role/role.dto';
import { RoleEntity } from 'src/common/entities/role/RoleEntity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity) private readonly roleRepository :Repository<RoleEntity> 
    ){}





    async getAllRoles(): Promise<RoleEntity[]> {
        return this.roleRepository.find();
    }

    async createRole(roleDto: RoleCreateDTO): Promise<RoleEntity | null> {
        const newRole = this.roleRepository.create(roleDto);
        return this.roleRepository.save(newRole);
    }

    async findOneByName(name: string): Promise<RoleEntity> {
        return this.roleRepository.findOne({ where: { name } });
    }

    async findOneById(id: number): Promise<RoleEntity> {
        return this.roleRepository.findOne({where:{id}});
    }
    // //get all role
    // async all():Promise<RoleEntity[]>{
    //     return await this.roleRepository.find();
    // }


    // //Create a role
    // async create(data): Promise<RoleEntity | null> {
        
    //     return await this.roleRepository.save(data);
    // }

    // //find a role by name
    // async findOne(name : string): Promise<RoleEntity> {
    //     return this.roleRepository.findOne({where:{name}});
    // }

    // //find a role by id
    // async findOneById(id : number): Promise<RoleEntity> {
    //     return this.roleRepository.findOne({where:{id}});
    // }

    // //Update a role
    // // async update(id:number,data):Promise<RoleEntity >{
    // //     return await this.roleRepository.update(id,data);
    // // }
}

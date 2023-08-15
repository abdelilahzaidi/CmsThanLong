import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleEntity } from 'src/common/entities/role/RoleEntity';
import { RoleCreateDTO } from 'src/common/dto/role/role.dto';


@Controller('role')
export class RoleController {
    constructor(
        private roleService : RoleService
    ){}



    @Get()
    async getAllRoles(): Promise<RoleEntity[]> {
        return this.roleService.getAllRoles();
    }

    @Post()
    async createRole(@Body() roleDto: RoleCreateDTO): Promise<RoleEntity | null> {
        return this.roleService.createRole(roleDto);
    }


}

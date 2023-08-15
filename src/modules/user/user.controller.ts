import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from 'src/common/entities/User/UserEntity';

@Controller('user')
export class UserController {
    constructor(private userService :UserService){}

    //Get all users
    @Get()
    async all():Promise<UserEntity[]>{
        return await this.userService.all();
    }
}

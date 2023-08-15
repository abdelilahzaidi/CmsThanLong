import {  
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SignUpDTO } from 'src/common/dto/auth/signup.dto';

import { AuthService } from './auth.service';
import { LoginDTO } from 'src/common/dto/auth/login.dto';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/common/entities/User/UserEntity';


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    //private readonly userService: UserService
    ) {}
  //Register a new user
  @Post('register')
  async signUp(@Body() signUpDTO: SignUpDTO) {
    return this.authService.signup(
      signUpDTO     
      );
  }  

  //Register a new user
  @Post('login')
  async login(@Body() loginDTO: LoginDTO): Promise<{ token: string }> {
    console.log(await this.authService.login(loginDTO));
    return await this.authService.login(loginDTO);
  }

//Get current user
  @Get('user')
  @UseGuards(AuthGuard())
  async findOne(@CurrentUser() user: UserEntity) {
    
    console.log('curent user',user);
    return await user;
  }
}

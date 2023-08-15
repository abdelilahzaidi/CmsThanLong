import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './../../common/dto/auth/login.dto';
import {
  BadRequestException,
  Body,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from 'src/common/entities/User/UserEntity';
import { SignUpDTO } from 'src/common/dto/auth/signup.dto';
import * as bcrypt from 'bcrypt';
import JwtFeature from 'src/shared/jwtFeature.utils';
import { RoleService } from '../role/role.service';
import { LevelService } from '../level/level.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly levelService: LevelService,
    private jwtService: JwtService,
  ) {}

  //Register User

  // async signup(signUpDto: SignUpDTO): Promise<UserEntity> {
  //     const { password, password_confirm } = signUpDto;

  //     if (password !== password_confirm) {
  //         throw new BadRequestException('Passwords do not match!');
  //     }

  //     const hashedPassword = await bcrypt.hash(password, 12);

  //     try {
  //         // Create the user without role for now
  //         const user = await this.userService.create({
  //             ...signUpDto,
  //             password: hashedPassword,
  //             roles: [] // Initialize roles as an empty array
  //         });

  //         // Assign the desired role
  //         const roleId = signUpDto.role_id; // Make sure you have roleId in your SignUpDTO
  //         if (roleId) {
  //             const role = await this.roleService.findOneById(roleId);
  //             if (role) {
  //                 user.roles.push(role);
  //                 await this.userService.create(user);
  //             }
  //         }

  //         return user;
  //     } catch (error) {
  //         if (error.code === 11000) {
  //             throw new ConflictException('Duplicate Email!!');
  //         }
  //         throw error; // Re-throw other errors for proper handling
  //     }
  // }

  async signup(signUpDto: SignUpDTO): Promise<UserEntity> {
    const { password, password_confirm, levelId } = signUpDto;

    if (password !== password_confirm) {
      throw new BadRequestException('Passwords do not match!');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      // Create the user without role for now
      const user = await this.userService.create({
        ...signUpDto,
        password: hashedPassword,
        roles: [], // Initialize roles as an empty array
        level: null, // Innitialise level as null        
      });

     // Assign the desired role
      const levelId = signUpDto.levelId;
      const roleId = 1; // Make sure you have roleId in your SignUpDTO
      if (roleId) {
        const role = await this.roleService.findOneById(roleId);
        if (role) {
          user.roles.push(role);
          await this.userService.create(user);
        }
      }

      // Assign the desired level if levelId is provided
      if (levelId) {
        const level = await this.levelService.findOneById(levelId);
        if (level) {
          user.level = level;
          await this.userService.create(user); // Update the user with the assigned level
        }
      }

      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Duplicate Email!!');
      }
      throw error; // Re-throw other errors for proper handling
    }
  }

  // async signup(
  //     signUpDto :SignUpDTO,
  //     @Body('roles') ids : number
  //     ):Promise<UserEntity>{
  //     const {first_name,last_name,email,password,password_confirm}=signUpDto
  //     if (signUpDto.password !== signUpDto.password_confirm) {
  //         throw new BadRequestException('Passwords do not match!');
  //     }

  //     const hashed = await bcrypt.hash(signUpDto.password, 12);

  //     try{
  //         const user=await this.userService.create({
  //             first_name,
  //             last_name,
  //             email,
  //             password :hashed,
  //             password_confirm,
  //             role_id: ids
  //         });
  //         console.log("authService",password,' ',password_confirm)
  //         return user
  //     }
  //     catch(error){
  //         //Handle duplicate email
  //         if(error.code =11000){
  //             throw new ConflictException('Duplicate Email !!');
  //         }
  //     }

  // }

  //Login user
  async login(dto: LoginDTO): Promise<{ token: string }> {
    const { email, password } = dto;

    const user = await this.userService.findOne(email);
    console.log('before', user);

    if (!user) {
      throw new UnauthorizedException('Invalid email adress or password.');
    }

    //Check if password is correct or not
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    console.log('Paswword', isPasswordMatched);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email adress or password');
    }

    const token = await JwtFeature.assignJwtToken(user.id, this.jwtService);
    console.log(token);

    return { token };
  }

  async createUserWithRole(
    signUpDto: SignUpDTO,
    roleId: number,
  ): Promise<UserEntity> {
    const { first_name, last_name, email, password, password_confirm } =
      signUpDto;
    if (signUpDto.password !== signUpDto.password_confirm) {
      throw new BadRequestException('Passwords do not match!');
    }
    const role = await this.roleService.findOneById(roleId);
    const hashed = await bcrypt.hash(signUpDto.password, 12);

    try {
      const user = await this.userService.create({
        first_name,
        last_name,
        email,
        password: hashed,
        password_confirm,
        role: { id: signUpDto.role_id },
      });
      console.log('authService', password, ' ', password_confirm);
      if (!role) {
        throw new Error('Role not found');
      }
      (await user).roles = [role];
      return await this.userService.create(user);
    } catch (error) {
      //Handle duplicate email
      if ((error.code = 11000)) {
        throw new ConflictException('Duplicate Email !!');
      }
    }
  }
}

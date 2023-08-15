import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class SignUpDTO{

    @IsNotEmpty()
    first_name:string;

    @IsNotEmpty()
    last_name:string;  

    @IsNotEmpty()
    @IsEmail({},{message:'Please enter correct email address'})
    email:string; 

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/, {
        message: "password too weak, include in your password a special character and capital letter",
    })
    password:string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/, {
        message: "password too weak, include in your password a special character and capital letter",
    })
    password_confirm:string;

   
    role_id:number;

    @IsNotEmpty()
    levelId : number
}
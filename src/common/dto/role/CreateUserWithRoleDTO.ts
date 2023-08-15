import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateUserWithRoleDTO {
    @IsNumber()
    @IsNotEmpty()
    roleId: number;

    // Add other fields if needed
}
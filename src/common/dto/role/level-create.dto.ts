import { IsNotEmpty } from "class-validator";

export class LevelCreateDTO{
    @IsNotEmpty()
    grade:string;
}
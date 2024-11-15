import { IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsString()
    lastName: string;
    
    @IsString()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsString()
    @MinLength(10)
    phone: string;
}

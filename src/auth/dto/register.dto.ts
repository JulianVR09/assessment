import { IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsString()
    name: string;

    @IsString()
    @MinLength(10)
    phone: string;

    @IsString()
    lastName: string;

    @IsString()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
}
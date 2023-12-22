
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class EditUserDto {
    @IsOptional()
    name: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsOptional()
    password: string;

    @IsOptional()
    phone: string;

    @IsOptional()
    isVerified: boolean;

    @IsOptional()
    role: number;
}
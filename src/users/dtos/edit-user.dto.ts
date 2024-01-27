
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { Address } from "src/addresses/schemas/address.schema";
import { Product } from "src/products/schemas/product.schema";

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
    is_verified: boolean;

    @IsOptional()
    role: number;

    @IsOptional()
    image: string;
    
    @IsOptional()
    wish_list: Product[];

    @IsOptional()
    addresses: Address[];
}
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { Address } from "src/addresses/schemas/address.schema";
import { Product } from "src/products/schemas/product.schema";

export class CreateUserDto {

    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
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
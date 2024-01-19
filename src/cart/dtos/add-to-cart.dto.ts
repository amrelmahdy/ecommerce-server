import { IsArray,IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class AddToCartDto {
    @IsNotEmpty()
    productId: string;
    
    @IsInt()
    @IsNotEmpty()
    quantity: number;
}
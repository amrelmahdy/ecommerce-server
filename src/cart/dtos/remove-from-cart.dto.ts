import { IsArray,IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class RemoveFromCartDto {
    @IsNotEmpty()
    productId: string;
}
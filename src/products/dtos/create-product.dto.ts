import { IsNotEmpty, IsArray, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { Category } from 'src/categories/schemas/category.schema';
import { Product, Image, Review } from 'src/products/schemas/product.schema';

export class CreateProductDto {

    @IsNotEmpty()
    slug: string;

    @IsNotEmpty()
    en_name: string;

    @IsNotEmpty()
    ar_name: string;

    @IsNotEmpty()
    price: string;

    @IsOptional()
    new_price: string;

    @IsNotEmpty()
    en_description: string;

    @IsNotEmpty()
    ar_description: string;


    images: Image[];
    
    @IsNumber()
    stock: number;

    @IsOptional()
    @IsNumber()
    ratings: number;

    @IsOptional()
    reviews: Review[];

    @IsOptional()
    @IsBoolean()
    is_sale: boolean;

    @IsOptional()
    @IsBoolean()
    is_out_of_stock: boolean;
    
    @IsNotEmpty()
    categories: Category[];
}
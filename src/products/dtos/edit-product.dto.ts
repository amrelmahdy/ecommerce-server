import { IsNotEmpty, IsArray, IsNumber, IsBoolean, IsOptional, ArrayMinSize } from 'class-validator';
import { Category } from 'src/categories/schemas/category.schema';
import { Product, Image, Review } from 'src/products/schemas/product.schema';

export class EditProductDto {

    @IsOptional()
    en_name: string;

    ar_name: string;

    @IsOptional()
    ar_subtitle: string

    @IsOptional()
    en_subtitle: string

    @IsOptional()
    promotion_ar_title: string

    @IsOptional()
    promotion_en_title: string

    @IsOptional()
    @IsNumber()
    max_quantity: number;

    @IsOptional()
    slug: string;

    @IsOptional()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsNumber()
    sale_price: number;

    @IsOptional()
    en_description: string;

    @IsOptional()
    ar_description: string;

    @IsOptional()
    @IsArray()
    images: Image[];

    @IsOptional()
    @IsNumber()
    stock: number;

    @IsOptional()
    @IsNumber()
    average_rating: number;

    @IsOptional()
    reviews: Review[];

    @IsOptional()
    @IsBoolean()
    is_featured: boolean;

    @IsOptional()
    @IsBoolean()
    is_out_of_stck: boolean;

    @IsOptional()
    @IsBoolean()
    is_taxable: boolean;


    @IsOptional()
    @IsBoolean()
    is_on_sale: boolean;

    @IsOptional()
    @IsBoolean()
    require_shipping: boolean;

    @IsOptional()
    sku: string;

    @IsOptional()
    @IsBoolean()
    is_out_of_stock: boolean;

    @IsOptional()
    @ArrayMinSize(1)
    categories: Category[];
}
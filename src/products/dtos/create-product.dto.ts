import { IsNotEmpty, IsArray, IsNumber, IsBoolean, IsOptional, ArrayMinSize } from 'class-validator';
import { Category } from 'src/categories/schemas/category.schema';
import { Product, Image, Review } from 'src/products/schemas/product.schema';

// subtitle, promotion_title, max_quantity
export class CreateProductDto {

    @IsNotEmpty()
    en_name: string;

    @IsNotEmpty()
    ar_name: string;

    @IsOptional()
    ar_subtitle: string

    @IsOptional()
    en_subtitle: string

    @IsOptional()
    promotion_ar_title: string

    @IsOptional()
    promotion_en_title: string

    @IsNotEmpty()
    max_quantity: number;

    @IsNotEmpty()
    slug: string;

    @IsNotEmpty()
    price: number;

    @IsOptional()
    sale_price: number;

    @IsNotEmpty()
    en_description: string;

    @IsNotEmpty()
    ar_description: string;

    @ArrayMinSize(1)
    @IsNotEmpty()
    images: Image[];

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

    @ArrayMinSize(1)
    @IsNotEmpty()
    categories: Category[];
}
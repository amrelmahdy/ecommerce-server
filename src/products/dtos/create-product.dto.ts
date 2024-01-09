import { IsNotEmpty, IsArray, IsNumber, IsBoolean, IsOptional, ArrayMinSize } from 'class-validator';
import { Category } from 'src/categories/schemas/category.schema';
import { Product, Image, Review, Tag } from 'src/products/schemas/product.schema';
import { Vendor } from 'src/vendors/schemas/vendor.schema';


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

    @IsOptional()
    images: Image[];

    @IsOptional()
    en_tags: Tag[];

    @IsOptional()
    ar_tags: Tag[];

    @IsNumber()
    stock: number;

    @IsOptional()
    @IsNumber()
    average_rating: number;

    @IsOptional()
    reviews: Review[];

    @ArrayMinSize(1)
    @IsNotEmpty()
    categories: Category[];

    @IsNotEmpty()
    vendor: Vendor;

    @IsOptional()
    @IsBoolean()
    is_featured: boolean;

    @IsOptional()
    @IsBoolean()
    is_out_of_stock: boolean;

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
    is_published: boolean;
}
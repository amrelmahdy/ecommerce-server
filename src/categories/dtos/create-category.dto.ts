import { IsArray,IsNotEmpty, IsOptional } from 'class-validator';
import { Category } from './../schemas/category.schema'

export class CreateCategoryDto {
    @IsNotEmpty()
    ar_name: string;
    
    @IsNotEmpty()
    en_name: string;

    @IsOptional()
    icon: string;

    @IsOptional()
    @IsArray()
    sub_categories?: Category[];
    
    @IsOptional()
    parent?: Category;
}
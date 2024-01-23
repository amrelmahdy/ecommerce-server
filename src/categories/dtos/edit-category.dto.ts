import { IsOptional, IsArray } from 'class-validator';
import { Category } from '../schemas/category.schema';
import { Image } from 'src/utils/schemas';

export class EditCategoryDto {
    @IsOptional()
    ar_name: string;

    @IsOptional()
    en_name: string;
    
    @IsOptional()
    slug: string;

    @IsOptional()
    image: any;

    @IsOptional()
    @IsArray()
    sub_categories?: Category[];

    @IsOptional()
    parent?: Category;
}
import { IsOptional, IsArray } from 'class-validator';
import { Category } from '../schemas/category.schema';

export class EditCategoryDto {
    @IsOptional()
    ar_name: string;

    @IsOptional()
    en_name: string;

    @IsOptional()
    icon: string;

    @IsOptional()
    @IsArray()
    sub_categories?: Category[];

    @IsOptional()
    parent?: Category;
}
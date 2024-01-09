import { IsOptional } from 'class-validator';

export class EditVendorDto {
    @IsOptional()
    ar_name: string;
    
    @IsOptional()
    en_name: string;

    @IsOptional()
    slug: string;
}
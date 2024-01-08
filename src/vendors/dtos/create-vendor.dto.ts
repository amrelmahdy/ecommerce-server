import { IsArray,IsNotEmpty, IsOptional } from 'class-validator';
import { Vendor } from './../schemas/vendor.schema'

export class CreateVendorDto {
    @IsNotEmpty()
    ar_name: string;
    
    @IsNotEmpty()
    en_name: string;

    @IsNotEmpty()
    slug: string;
}
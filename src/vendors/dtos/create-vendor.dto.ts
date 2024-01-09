import { IsNotEmpty } from 'class-validator';

export class CreateVendorDto {
    @IsNotEmpty()
    ar_name: string;

    @IsNotEmpty()
    en_name: string;

    @IsNotEmpty()
    slug: string;
}
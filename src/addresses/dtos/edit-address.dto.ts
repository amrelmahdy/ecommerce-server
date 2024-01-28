import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/users/schemas/user.schema';

export class EditAddressDto {
    user: User

    @IsOptional()
    name: string;

    @IsOptional()
    phone: string;

    @IsOptional()
    country: string;

    @IsOptional()
    city: string;

    @IsOptional()
    district: string;

    @IsOptional()
    street: string;

    @IsOptional()
    building: string;

    @IsOptional()
    postal_code: string;

    @IsOptional()
    landmark: string;

    @IsOptional()
    address_description: string;

    @IsOptional()
    is_default: Boolean
}
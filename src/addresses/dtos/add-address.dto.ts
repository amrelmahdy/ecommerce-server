import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/users/schemas/user.schema';

export class AddAddressDto {
    @IsNotEmpty()
    user: User

    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    country: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    district: string;

    @IsNotEmpty()
    street: string;

    @IsNotEmpty()
    building: string;

    @IsNotEmpty()
    postal_code: string;

    @IsOptional()
    landmark: string;

    @IsOptional()
    address_description: string;

    @IsOptional()
    is_default: Boolean
}
import { IsNotEmpty } from 'class-validator';

export class SetDefaultAddressDto {
    @IsNotEmpty()
    addressId: string
}
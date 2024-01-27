import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AddAddressDto } from './dtos/add-address.dto';
import { AddressesService } from './addresses.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SetDefaultAddressDto } from './dtos/set-default-address.dto';

@Controller('addresses')
export class AddressesController {

    constructor(private addressesService: AddressesService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    createAddress(@Body() address: AddAddressDto, @Request() req: any) {
        const userId = req.user.userId
        return this.addressesService.create(address, userId);
    }


    @UseGuards(JwtAuthGuard)
    @Post("default")
    setDefaultAddress(@Body() body: SetDefaultAddressDto, @Request() req: any) {
        const userId = req.user.userId
        const addressId = body.addressId
        return this.addressesService.setDefaultAddress(addressId, userId);
    }
}

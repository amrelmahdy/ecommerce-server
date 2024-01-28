import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AddAddressDto } from './dtos/add-address.dto';
import { AddressesService } from './addresses.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SetDefaultAddressDto } from './dtos/set-default-address.dto';
import { Address } from './schemas/address.schema';
import { EditAddressDto } from './dtos/edit-address.dto';

@Controller('addresses')
export class AddressesController {

    constructor(private addressesService: AddressesService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    createAddress(@Body() address: AddAddressDto, @Request() req: any): Promise<Address> {
        const userId = req.user.userId
        return this.addressesService.create(address, userId);
    }


    @UseGuards(JwtAuthGuard)
    @Post("default")
    setDefaultAddress(@Body() body: SetDefaultAddressDto, @Request() req: any): Promise<Address> {
        const userId = req.user.userId
        const addressId = body.addressId
        return this.addressesService.setDefaultAddress(addressId, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    getAddress(@Param("id") id: string) {
        return this.addressesService.findById(id);
    }


    @UseGuards(JwtAuthGuard)
    @Put(":id")
    updateAddress(@Param("id") id: string, @Body() address: EditAddressDto) {
        return this.addressesService.update(id, address);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    deleteAddress(@Param("id") id: string): Promise<Address> {
        return this.addressesService.delete(id);
    }
}

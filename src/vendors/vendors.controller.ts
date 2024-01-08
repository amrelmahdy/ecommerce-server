import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { Vendor } from './schemas/vendor.schema';
import { CreateVendorDto } from './dtos/create-vendor.dto';
import { EditVendorDto } from './dtos/edit-vendor-dto';

@Controller('vendors')
export class VendorsController {
    constructor(private vendorsService: VendorsService) { }

    @Get()
    getAllVendors(): Promise<Vendor[]> {
        return this.vendorsService.getAll();
    }

    @Post()
    creareCategory(@Body() vendor: CreateVendorDto): Promise<Vendor> {
        return this.vendorsService.create(vendor);
    }


    @Get(":slug")
    async getProduct(@Param("slug") slug: string): Promise<Vendor> {
        return this.vendorsService.findOne({ slug });
    }

    @Put(":id")
    async editProduct(@Param("id") id: string,@Body() body: EditVendorDto): Promise<Vendor> {
        return this.vendorsService.update(id, body);
    }

    @Delete(":id")
    async deleteProduct(@Param("id") id: string): Promise<Vendor> {
        return this.vendorsService.delete(id);
    }
}

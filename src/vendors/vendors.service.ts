import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Vendor } from './schemas/vendor.schema';

@Injectable()
export class VendorsService {
    constructor(
        @InjectModel(Vendor.name)
        private vendorsModule: mongoose.Model<Vendor>
    ) { }

    async getAll(): Promise<Vendor[]> {
        const vendors = await this.vendorsModule.find();
        return vendors;
    }

    async create(vendor: Vendor): Promise<Vendor> {
        const vendorWithSlug = await this.vendorsModule.findOne({ slug: vendor.slug })
        if (vendorWithSlug) {
            throw new ConflictException(`Vendor with slug "${vendor.slug}" already exists`);
        }
        return this.vendorsModule.create(vendor);
    }


    async findOne(query: any): Promise<Vendor> {
        const vendor = await this.vendorsModule.findOne(query);
        if (!vendor) {
            throw new NotFoundException("Vendor not found")
        }
        return vendor;
    }

    async findById(id: string): Promise<Vendor>  { 
        const vendor = await this.vendorsModule.findById(id);
        if (!vendor) {
            throw new NotFoundException("vendor not found");
        }
        return vendor;
    }

    async update(id: string, vendor: Vendor): Promise<Vendor> {
        const validObjectId = mongoose.Types.ObjectId.isValid(id);
        if (!validObjectId) {
            if (!validObjectId) {
                throw new NotFoundException(`Invalid Product id ${id}`)
            }
        }
        const updatedProduct = await this.vendorsModule.findOneAndUpdate(
            { _id: id },
            { $set: { ...vendor } },
            { new: true }
        );
        if (!updatedProduct) {
            throw new NotFoundException("Vendor not found")
        }
        return updatedProduct;
    }

    async delete(id: string): Promise<Vendor> {
        const deleted = await this.vendorsModule.findOneAndDelete({ _id: id });
        if (!deleted) {
            throw new NotFoundException("Vendor not found")
        }
        return deleted;
     }
}

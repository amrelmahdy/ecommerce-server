import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Vendor } from './schemas/vendor.schema';

@Injectable()
export class VendorsService {
    constructor(
        @InjectModel(Vendor.name)
        private vendorsModel: mongoose.Model<Vendor>
    ) { }

    async getAll(): Promise<Vendor[]> {
        const vendors = await this.vendorsModel.find();
        return vendors;
    }

    async getListOfIds(slugs: string[]): Promise<any> {
        const vendorIds = await this.vendorsModel
            .findOne({ slug: { $in: slugs } })
            .distinct('_id');

        const stringIds = vendorIds.map((id) => id.toString());

        return stringIds
    }

    async create(vendor: Vendor): Promise<Vendor> {
        const vendorWithSlug = await this.vendorsModel.findOne({ slug: vendor.slug })
        if (vendorWithSlug) {
            throw new ConflictException(`Vendor with slug "${vendor.slug}" already exists`);
        }
        return this.vendorsModel.create(vendor);
    }


    async findOne(query: any): Promise<Vendor> {
        const vendor = await this.vendorsModel.findOne(query);
        if (!vendor) {
            throw new NotFoundException("Vendor not found")
        }
        return vendor;
    }

    async findById(id: string): Promise<Vendor> {
        const vendor = await this.vendorsModel.findById(id);
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
        const updatedVendor = await this.vendorsModel.findOneAndUpdate(
            { _id: id },
            { $set: { ...vendor } },
            { new: true }
        );
        if (!updatedVendor) {
            throw new NotFoundException("Vendor not found")
        }
        return updatedVendor;
    }

    async delete(id: string): Promise<Vendor> {
        const deleted = await this.vendorsModel.findOneAndDelete({ _id: id });
        if (!deleted) {
            throw new NotFoundException("Vendor not found")
        }
        return deleted;
    }
}

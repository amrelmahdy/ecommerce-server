import { Injectable, NotFoundException } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { Address } from './schemas/address.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AddressesService {
    constructor(
        @InjectModel(Address.name)
        private addressesModel: mongoose.Model<Address>,
        private usersService: UsersService
    ) { }

    async create(address: Address, userId: string) : Promise<Address> {
        const currentuser = this.usersService.findById(userId);
        if (!currentuser) {
            throw new NotFoundException("User not found.")
        }

        // Check if the new address is default
        if (address.is_default) {
            // Set is_default to false for all other addresses
            await this.addressesModel.updateMany(
                { user: userId }, // Exclude the new address
                { $set: { is_default: false } }
            );
        }

        const addressCreated = await this.addressesModel.create(address);
        if (addressCreated) {
            await this.usersService.update(
                userId,
                { name: 'amr' },
                { $addToSet: { addresses: addressCreated._id } }
            );
        }
        return addressCreated;
    }

    async setDefaultAddress(addressId: string, userId: string): Promise<Address> {
        const currentuser = this.usersService.findById(userId);
        if (!currentuser) {
            throw new NotFoundException("User not found.")
        }
        // Set the other addresses to false
        await this.addressesModel.updateMany(
            { user: userId, _id: { $ne: addressId } }, // Exclude the current address
            { $set: { is_default: false } }
        );

        // Set the specified address as default
        const address = await this.addressesModel.findByIdAndUpdate(
            addressId,
            { $set: { is_default: true } },
            { new: true } // To return the updated document
        );

        if (!address) {
            throw new NotFoundException("Address not found.")
        }

        return address;
    }

    async findById(addressId: string){
        const address = await this.addressesModel.findById(addressId);
        if (!address) {
            throw new NotFoundException("Address not found.")
        }
        return address
    }

    async delete(addressId: string){
        const address = await this.addressesModel.findByIdAndDelete(addressId);
        if (!address) {
            throw new NotFoundException("Address not found.")
        }
        return address
    }
}

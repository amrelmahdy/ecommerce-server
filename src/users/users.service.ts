import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './schemas/user.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductsService } from 'src/products/products.service';

export enum Role {
    User = 'user',
    Admin = 'admin',
}

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private usersModel: mongoose.Model<User>,
        private productsService: ProductsService
    ) { }

    async getAll(): Promise<User[]> {
        const users = await this.usersModel.find({});
        return users
    }

    async create(user: User): Promise<User> {
        const res = await this.usersModel.create(user);
        return res
    }


    async findById(id: string): Promise<User> {
        const user = await this.usersModel.findById(id).populate("wish_list addresses");
        if (!user) {
            throw new NotFoundException("User not found.");
        }
        return user
    }



    async findByEmailOrPhone(email: string, phone: string): Promise<User> {
        const user = await this.usersModel.findOne({ "$or": [{ email: email }, { phone: phone }] }).populate("wish_list");
        return user;
    }

    async update(id: string, user: any, extras?: any): Promise<User> {
        const updatedUser = await this.usersModel.findByIdAndUpdate(
            { _id: id },
            { $set: { ...user }, ...extras },
            { new: true }
        );
        return updatedUser
    }

    async delete(id: string): Promise<User> {
        const user = await this.usersModel.findOneAndDelete({ _id: id });
        if (!user) {
            throw new NotFoundException("User not found.");
        }
        return user
    }

    async addTotWishList(username: string, productId: string) {
        const product = await this.productsService.findById(productId);
        if (!product) {
            throw new NotFoundException("Product not found.");
        }

        // Find the user and check if the product is already in the wishlist
        const user = await this.usersModel.findOne(
            { "$or": [{ email: username }, { phone: username }] }
        );

        if (!user) {
            throw new NotFoundException("User not found.");
        }

        const isProductInWishlist = user.wish_list.some((wishlistProduct) => wishlistProduct.toString() === productId.toString());
        const filter = { "$or": [{ email: username }, { phone: username }] };

        const updateOperation = isProductInWishlist
        ? { $pull: { wish_list: productId } }
        : { $addToSet: { wish_list: productId } };


        const userUpdated = await this.usersModel.findOneAndUpdate(filter, updateOperation, { new: true }).populate("addresses wish_list");

        if (!userUpdated) {
            throw new NotFoundException("Failed to update user wishlist.");
        }

        return userUpdated;
    }

}

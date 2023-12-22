import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './schemas/user.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export enum Role {
    User = 'user',
    Admin = 'admin',
}

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>
    ) { }

    async getAll(): Promise<User[]> {
        const users = await this.userModel.find({});
        return users
    }

    async create(user: User): Promise<User> {
        const res = await this.userModel.create(user);
        return res
    }


    async findById(id: string): Promise<User> {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException("User not found.");
        }
        return user
    }

    async findByEmailOrPhone(email: string, phone: string): Promise<User> {
        const user = await this.userModel.findOne({ "$or": [{ email: email }, { phone: phone }] });
        return user;
    }

    async update(id: string, user: User): Promise<User> {
        const updatedUser = await this.userModel.findOneAndUpdate(
            { _id: id },
            { $set: { ...user } },
            { new: true }
        );
        return updatedUser
    }

    async delete(id: string): Promise<User> {
        const user = await this.userModel.findOneAndDelete({ _id: id });
        if (!user) {
            throw new NotFoundException("User not found.");
        }
        return user
    }
}

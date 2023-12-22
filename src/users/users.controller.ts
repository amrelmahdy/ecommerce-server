import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { EditUserDto } from './dtos/edit-user.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAll();
    }

    @Get(":id")
    async getUser(@Param("id") id: string): Promise<User> {
        return this.userService.findById(id);
    }

    @Put(":id")
    async updateUser(@Param("id") id: string, @Body() body: EditUserDto): Promise<User> {
        return this.userService.update(id, body);
    }

    @Delete(":id")
    async deleteUser(@Param("id") id: string): Promise<User> {
        return this.userService.delete(id);
    }
}

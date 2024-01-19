import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { EditUserDto } from './dtos/edit-user.dto';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async getUser(@Param("id") id: string): Promise<User> {
        return this.userService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    async updateUser(@Param("id") id: string, @Body() body: EditUserDto): Promise<User> {
        return this.userService.update(id, body);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async deleteUser(@Param("id") id: string): Promise<User> {
        return this.userService.delete(id);
    }

    
    @UseGuards(JwtAuthGuard)
    @Post("/user/wishlist")
    async addTotWishList(@Request() req: any, @Body("productId") productId: string) {
        console.log(req.user)
        return this.userService.addTotWishList(req.user.username, productId)
    }
}

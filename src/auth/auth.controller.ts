import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshTokenJwtAuthGuard } from './guards/refresh-tokeen-jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login(@Request() req: any): Promise<any> {
        return this.authService.login(req.user)
    }

    @Post("register")
    async register(@Body() user: CreateUserDto): Promise<any> {
        return this.authService.register(user)
    }

    
    @UseGuards(JwtAuthGuard)
    @Get("user")
    async getUser(@Request() req: any): Promise<User> {
        return this.authService.getCurrentUser(req.user);
    }

    @UseGuards(RefreshTokenJwtAuthGuard)
    @Post("refresh")
    async refreshToken(@Request() req: any): Promise<any> {
        return this.authService.refreshToken(req.user);
    }
}

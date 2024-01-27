import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

const bcryptjs = require('bcryptjs')

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<User> {
        const user = await this.usersService.findByEmailOrPhone(username, username);
        if (user) {
            const isMatch = await bcryptjs.compare(password, user.password)
            if (isMatch) {
                const plainUser = (user as any).toObject();
                const { password, __v, ...rest } = plainUser;
                return rest;
            }
        }
        return null;
    }

    async login(user: User) {
        const now = Date.now()
        const userId = (user as any)._id
        const payload = {
            userId: userId.toString(),
            username: user.email,
            sub: {
                name: user.name,
                phone: user.phone
            }
        };
        // Calculate expiration time for access token (1 day)
        const accessTokenExpiresAt = now + (86400 * 1000); // 86400 seconds * 1000 milliseconds/second
        // Calculate expiration time for refresh token (7 days)
        const refreshTokenExpiresAt = now + (7 * 24 * 60 * 60 * 1000); // 7 days * 24 hours/day * 60 minutes/hour * 60 seconds/minute * 1000 milliseconds/second
        return {
            access_token: this.jwtService.sign(payload, { expiresIn: '86400s' }),
            refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
            token_type: "Bearer",
            expires_in: "86400",
            expires_at: `${accessTokenExpiresAt}`,
            refresh_expires_in: "604800",
            refresh_expires_at: `${refreshTokenExpiresAt}`,
            userInfo: user
        }
    }

    async register(body: User): Promise<any> {
        const now = Date.now()
        const { email, phone, password } = body;
        const userIsTaken = await this.usersService.findByEmailOrPhone(email, phone)
        if (userIsTaken) {
            throw new BadRequestException("User has already been taken.")
        }

        const salt = await bcryptjs.genSalt(10);

        const hash = await bcryptjs.hash(password, salt)

        body.password = hash;

        const user = await this.usersService.create(body);


        const userId = (user as any)._id

        const payload = {
            userId: userId,
            username: user.email,
            sub: {
                name: user.name,
                phone: user.phone
            }
        };
        // Calculate expiration time for access token (1 day)
        const accessTokenExpiresAt = now + (86400 * 1000); // 86400 seconds * 1000 milliseconds/second
        // Calculate expiration time for refresh token (7 days)
        const refreshTokenExpiresAt = now + (7 * 24 * 60 * 60 * 1000); // 7 days * 24 hours/day * 60 minutes/hour * 60 seconds/minute * 1000 milliseconds/second

        return {
            access_token: this.jwtService.sign(payload, { expiresIn: '86400s' }),
            refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
            token_type: "Bearer",
            expires_in: "86400",
            expires_at: `${accessTokenExpiresAt}`,
            refresh_expires_in: "604800",
            refresh_expires_at: `${refreshTokenExpiresAt}`,
            userInfo: user
        }
    }

    refreshToken(currentUser: any): any {
        const now = Date.now()
         // Calculate expiration time for access token (1 day)
         const accessTokenExpiresAt = now + (86400 * 1000); // 86400 seconds * 1000 milliseconds/second
        const payload = {
            userId: currentUser.userId,
            username: currentUser.username,
            sub: {
                name: currentUser.user.name,
                phone: currentUser.user.phone
            }
        };
        return {
            access_token: this.jwtService.sign(payload, { expiresIn: '86400s' }),
            expires_in: "86400",
            expires_at: `${accessTokenExpiresAt}`,
        }
    }

    async getCurrentUser(user: any): Promise<User> {
        const { userId } = user
        const currentUser = await this.usersService.findById(userId);
        return currentUser
    }

    async decodeToken(token: string) {
        const decodedToken = this.jwtService.decode(token);
        return decodedToken
    }

}

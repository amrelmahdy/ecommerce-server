import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

const bcryptjs = require('bcryptjs')
const now = Date.now()

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
                const { password, __v, _id, ...rest } = plainUser;
                return rest;
            }
        }
        return null;
    }

    async login(user: User) {
        const payload = {
            username: user.email,
            sub: {
                name: user.name,
                phone: user.phone
            }
        };
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, { expiresIn: '86400s' }),
            token_type: "Bearer",
            expires_in: "3600",
            "expires_at": `${now + 3600}`,
            "refresh_expires_at": `${now + 86400}`,
            "refresh_expires_in": "86400",
            userInfo: user
        }
    }

    async register(body: User): Promise<any> {
        const { email, phone, password } = body;
        const userIsTaken = await this.usersService.findByEmailOrPhone(email, phone)
        if (userIsTaken) {
            throw new BadRequestException("User has already been taken.")
        }

        const salt = await bcryptjs.genSalt(10);

        const hash = await bcryptjs.hash(password, salt)

        body.password = hash;

        const user = await this.usersService.create(body);

        const payload = {
            username: user.email,
            sub: {
                name: user.name,
                phone: user.phone
            }
        };
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, { expiresIn: '86400s' }),
            token_type: "Bearer",
            expires_in: "3600",
            "expires_at": `${now + 3600}`,
            "refresh_expires_at": `${now + 86400}`,
            "refresh_expires_in": "86400",
            userInfo: user
        }
    }

    refreshToken(currentUser: any): any {
        const payload = {
            username: currentUser.username,
            sub: {
                name: currentUser.user.name,
                phone: currentUser.user.phone
            }
        };
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}

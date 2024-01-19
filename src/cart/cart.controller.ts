import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Cart } from './schemas/cart.schema';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddToCartDto } from './dtos/add-to-cart.dto';

@Controller('cart')
export class CartController {
    constructor(
        private cartService: CartService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    getCart(@Request() req: any) : Promise<Cart> {
        const userId = req.user.userId;
        return this.cartService.getCartByUserId(userId)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    createCart(@Body("userId") userId: string): Promise<Cart> {
        return this.cartService.createCart(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post("add")
    addToCart(@Body() body: AddToCartDto, @Request() req: any) : Promise<any>{
        const { productId, quantity } = body;
        const userId = req.user.userId;
        return this.cartService.addItemToCart(userId, productId, quantity);
    }

    @Post()
    emptyCart() {

    }
}

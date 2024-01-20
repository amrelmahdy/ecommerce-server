import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import mongoose from 'mongoose';
import { Cart } from './schemas/cart.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class CartService {

    constructor(
        @InjectModel(Cart.name)
        private cartModel: mongoose.Model<Cart>,
        private usersService: UsersService,
        private productsService: ProductsService
    ) { }


    async createCart(userId: string): Promise<Cart> {
        const cartAlreadyThere = await this.cartModel.findOne({ user: userId });
        if (cartAlreadyThere) {
            throw new BadRequestException("Cart is already there")
        }
        const user = this.usersService.findById(userId);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        const cart = this.cartModel.create({
            user: userId,
            items: []
        })
        return cart
    }



    async getCartByUserId(userId: string): Promise<Cart> {
        let cart = await this.cartModel.findOne({ user: userId })?.populate({
            path: 'items.product',
            model: 'Product'
        }) as Cart
        if (!cart) {
            cart = await this.createCart(userId);
        }
        return cart
    }

    async addItemToCart(userId: string, productId: string, quantity: number): Promise<any> {
        let cart = await this.getCartByUserId(userId);
        if (!cart) {
            cart = await this.createCart(userId);
        }
        const product  = await this.productsService.findById(productId);
        if(!product){
            throw new NotFoundException("This product not found")
        }
        const itemIndex = cart.items.findIndex(item => {
            const id =(item.product as any)._id.toString();
            return id === productId
        });
        if (itemIndex !== -1) {
            cart.items[itemIndex].quantity = quantity;
            return this.cartModel.findOneAndUpdate(
                { user: userId },
                { $set: { items: cart.items } }, // Update the items array
                { new: true }
            ).populate({
                path: 'items.product',
                model: 'Product'
            })
        } else {
            return this.cartModel.findOneAndUpdate(
                { user: userId },
                { $push: { items: { product: productId, quantity } } },
                { new: true }
            ).populate({
                path: 'items.product',
                model: 'Product'
            })
        }

    }

    async removeProductFromCart(userId: string, productId:  string){
        let cart = await this.getCartByUserId(userId);
        if (!cart) {
            cart = await this.createCart(userId);
        }
        const product  = await this.productsService.findById(productId);
        if(!product){
            throw new NotFoundException("This product not found")
        }
        const newItems = cart.items.filter(item => {
            const id =(item.product as any)._id.toString();
            return id !== productId
        });
        return this.cartModel.findOneAndUpdate(
            { user: userId },
            { $set: { items: newItems } },
            { new: true }
        ).populate({
            path: 'items.product',
            model: 'Product'
        })
    }
}
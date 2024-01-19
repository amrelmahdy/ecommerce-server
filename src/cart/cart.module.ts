import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { cartSchema } from './schemas/cart.schema';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cart', schema: cartSchema }]),
    UsersModule,
    ProductsModule
  ],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule { }

import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { CategoriesModule } from 'src/categories/categories.module';
import { VendorsModule } from 'src/vendors/vendors.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports:
    [
      CategoriesModule,
      VendorsModule,
      CloudinaryModule,
      MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
      
    ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule { }

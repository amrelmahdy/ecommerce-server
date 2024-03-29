import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './schemas/category.schema';
import { VendorsService } from 'src/vendors/vendors.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports:
    [
      MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
      MulterModule
    ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService]
})
export class CategoriesModule { }

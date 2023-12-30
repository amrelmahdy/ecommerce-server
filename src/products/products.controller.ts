import { Controller, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService){ }

    @Post()
    async createProduct(@Body() body: CreateProductDto){
        console.log("body", body)
    }
}

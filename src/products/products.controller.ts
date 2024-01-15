import { Controller, Post, Body, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product } from './schemas/product.schema';
import { EditProductDto } from './dtos/edit-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }

    @Get()
    async getAllProducts(): Promise<Product[]> {
        return this.productsService.getAll();
    }


    @Get("/shop")
    async getShopProducts(@Query() query: any): Promise<any> {
        return this.productsService.getAll(query, true);
    }


    @Post()
    async createProduct(@Body() body: CreateProductDto): Promise<Product> {
        return this.productsService.create(body);
    }

    @Post("bulk")
    async createBulkProducts(@Body() body: CreateProductDto[]): Promise<Product[]> {
        return this.productsService.createBulk(body);
    }


    @Get(":slug")
    async getProduct(@Param("slug") slug: string): Promise<Product> {
        return this.productsService.findOne({ slug });
    }

    @Get("/:slug/related")
    async getRelatedProducts(@Param("slug") slug: string): Promise<Product[]> {
        return this.productsService.getRelatedProducts(slug);
    }

    @Put(":id")
    async editProduct(@Param("id") id: string,@Body() body: EditProductDto): Promise<Product> {
        return this.productsService.update(id, body);
    }

    @Delete(":id")
    async deleteProduct(@Param("id") id: string): Promise<Product> {
        return this.productsService.delete(id);
    }
}

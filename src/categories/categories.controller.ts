import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { EditCategoryDto } from './dtos/edit-category.dto';

@Controller('categories')
export class CategoriesController {

    constructor(private categoriesService: CategoriesService) { }

    @Get()
    getAllCategories(): Promise<Category[]> {
        return this.categoriesService.getAll()
    }

    @Post()
    creareCategory(@Body() category: CreateCategoryDto): Promise<Category> {
        return this.categoriesService.create(category);
    }

    @Get(':id')
    getCategory(@Param('id') id: string): Promise<Category> {
        return this.categoriesService.findById(id);
    }


    @Put(':id')
    editCategory(@Param('id') id: string, @Body() body: EditCategoryDto): Promise<Category> {
        return this.categoriesService.update(id, body);
    }


    @Delete(':id')
    deleteCategory(@Param('id') id: string): Promise<Category> {
        return this.categoriesService.delete(id);
    }

}

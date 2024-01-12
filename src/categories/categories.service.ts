import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import * as mongoose from 'mongoose';

const fs = require('fs-extra')
@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(Category.name)
        private categoryModel: mongoose.Model<Category>
    ) { }

    async getAll(): Promise<Category[]> {
        // const categories = await this.categoryModel.find({ parent: { $exists: false } }).populate('sub_categories');
        const categories = await this.categoryModel.find().populate('sub_categories parent').sort({ createdAt: -1 })
        return categories;
    }

    async create(category: Category): Promise<Category> {
        const categoryWithSlug = await this.categoryModel.findOne({ slug: category.slug })
        if (categoryWithSlug) {
            throw new ConflictException(`Category with slug "${category.slug}" already exists`);
        }
        const res = await this.categoryModel.create(category);
        if (category.parent) {
            await this.categoryModel.updateOne(
                { _id: category.parent },
                { $push: { sub_categories: res.id } }
            );
        }
        return res;
    }

    async createBulk(categories: Category[]): Promise<Category[]> {
        const categoryCreated = Promise.all(categories.map(async (category) => {
            const categoryWithSlug = await this.categoryModel.findOne({ slug: category.slug })
            if (categoryWithSlug) {
                return;
            }
            const res = await this.categoryModel.create(category);
            return res;
        }))
        return categoryCreated;
    }


    async findById(id: string): Promise<Category> {
        const category = await this.categoryModel.findById(id).populate("sub_categories")
        if (!category) {
            throw new NotFoundException("Category not found")
        }
        return category;
    }


    async findOne(query: any): Promise<any> {
        const category = await this.categoryModel.findOne(query).populate("sub_categories")
        if (!category) {
            throw new NotFoundException("Category not found")
        }
        return category;
    }



    async update(id: string, category: Category): Promise<Category> {
        const { ar_name, en_name, slug, image } = category;
        const updatedCategory = await this.categoryModel.findOneAndUpdate(
            { _id: id },
            { $set: { ar_name, en_name, slug, image } },
            { new: true }
        );

        if (!updatedCategory) {
            throw new NotFoundException("Category not found")
        }
        // if there is no parent for this category
        if (!category.parent) {

            // remove parent in a spearate step
            const parentRemoved = await this.categoryModel.findOneAndUpdate(
                { _id: id },
                { $unset: { parent: 1 }, }
            );

            await this.categoryModel.findOneAndUpdate(
                { _id: parentRemoved.parent },
                {
                    // Remove the category from the sub_categories array of its parent category
                    $pull: { sub_categories: id }
                }
            );

        } else {
            await this.categoryModel.updateOne(
                { _id: category.parent },
                { $addToSet: { sub_categories: id } }
            );
        }
        return updatedCategory
    }


    async delete(id: string): Promise<Category> {
        const deleted = await this.categoryModel.findOneAndDelete({ _id: id });
        if (!deleted) {
            throw new NotFoundException("Category not found")
        }
        // Remove the category from the sub_categories array of its parent category
        await this.categoryModel.findOneAndUpdate(
            { _id: deleted.parent },
            {
                // Remove the category from the sub_categories array of its parent category
                $pull: { sub_categories: id }
            }
        );
        const currentDirectory = process.cwd();
        fs.remove(currentDirectory + "/assets/uploads/categories/" + deleted.slug);
        return deleted;
    }
}

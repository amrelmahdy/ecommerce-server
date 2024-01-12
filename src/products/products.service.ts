import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import mongoose, { Mongoose } from 'mongoose';
import { Product } from './schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CategoriesService } from 'src/categories/categories.service';
import { VendorsService } from 'src/vendors/vendors.service';

function fuzzySearch(text) {
    return text.split('').join('.*');
}

const fs = require('fs-extra')
@Injectable()
export class ProductsService {
    constructor(
        private categoriesService: CategoriesService,
        private vendorsServices: VendorsService,
        @InjectModel(Product.name)
        private productsModel: mongoose.Model<Product>
    ) { }

    async getAll(query?: any): Promise<Product[]> {
        let searchQuery: any = {}

        if (query?.search) {
            searchQuery['$or'] = [
                { 'ar_name': { $regex: query.search, $options: 'i' } },
                { 'en_name': { $regex: new RegExp(query.search, 'i') } },
                { 'en_tags': { $elemMatch: { 'slug': { $in: [query.search] } } } },
                { 'ar_tags': { $elemMatch: { 'slug': { $in: [query.search] } } } },
            ]
        }

        if (query?.category) {
            const category = await this.categoriesService.findOne({ slug: query.category });
            if (category) {
                searchQuery.categories = { $in: [category._id] }
            }
        }
        if (query?.vendor) {
            const vendors = query.vendor.split(",");
            const vendorIds = await this.vendorsServices.getListOfIds(vendors);
            searchQuery.vendor = { $in: vendorIds }
        }

        if (query?.tag) {
            searchQuery['$or'] = [
                { 'en_tags': { $elemMatch: { 'slug': { $in: [query.tag] } } } },
                { 'ar_tags': { $elemMatch: { 'slug': { $in: [query.tag] } } } },
            ]
        }
        const products = await this.productsModel
            .find(searchQuery)
            .populate('categories vendor')
            .sort({ createdAt: -1 });
        return products;
    }

    async create(product: Product): Promise<Product> {
        const productWithSlug = await this.productsModel.findOne({ slug: product.slug })
        if (productWithSlug) {
            throw new ConflictException(`Product with slug "${product.slug}" already exists`);
        }
        const res = await this.productsModel.create(product);
        return res;
    }

    async createBulk(products: Product[]): Promise<Product[]> {
        const productsCreated = Promise.all(products.map(async (product) => {
            const productWithSlug = await this.productsModel.findOne({ slug: product.slug })
            if (productWithSlug) {
                return;
            }
            const res = await this.productsModel.create(product);
            return res;
        }))
        return productsCreated;
    }

    async findById(id: string): Promise<Product> {
        const product = await this.productsModel.findById(id).populate("categories")
        if (!product) {
            throw new NotFoundException("Product not found")
        }
        return product;
    }

    async findOne(query: any): Promise<Product> {
        const product = await this.productsModel.findOne(query).populate("categories vendor");
        if (!product) {
            throw new NotFoundException("Product not found")
        }
        return product;
    }


    async getRelatedProducts(slug: string): Promise<Product[]> {
        const product = await this.productsModel.findOne({ slug });
        if (!product) {
            if (!product) {
                throw new NotFoundException("Product not found")
            }
        }
        const products = await this.productsModel.find({ "categories": product.categories, slug: { $ne: slug } }).populate("categories");
        return products
    }


    async update(id: string, product: Product): Promise<Product> {
        const validObjectId = mongoose.Types.ObjectId.isValid(id);
        if (!validObjectId) {
            if (!validObjectId) {
                throw new NotFoundException(`Invalid Product id ${id}`)
            }
        }
        const updatedProduct = await this.productsModel.findOneAndUpdate(
            { _id: id },
            { $set: { ...product } },
            { new: true }
        );
        if (!updatedProduct) {
            throw new NotFoundException("Product not found")
        }
        return updatedProduct;
    }

    async delete(id: string): Promise<Product> {
        const deleted = await this.productsModel.findOneAndDelete({ _id: id });
        if (!deleted) {
            throw new NotFoundException("Product not found")
        }
        const currentDirectory = process.cwd();
        fs.remove(currentDirectory + "/assets/uploads/products/" + deleted.slug);
        return deleted;
    }
}


// async create(Product: Product): Promise<Product> {
//     const ProductWithSlug = await this.ProductModel.findOne({ slug: Product.slug })
//     if(ProductWithSlug){
//         throw new ConflictException(`Product with slug "${ Product.slug }" already exists`);
//     }
//     const res = await this.ProductModel.create(Product);
//     if (Product.parent) {
//         await this.ProductModel.updateOne(
//             { _id: Product.parent },
//             { $push: { sub_categories: res.id } }
//         );
//     }
//     return res;
// }

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from './../../categories/schemas/category.schema'
import mongoose from 'mongoose';
import { Vendor } from 'src/vendors/schemas/vendor.schema';


export interface Image {
    url: string;
    width: number;
    height: number;
}

export interface Review {
    value: string;
    headline: string;
    review: string;
}


export interface Tag {
    name: string;
    slug: string;
}

@Schema({
    timestamps: true
})

export class Product {
    @Prop({ required: true })
    slug: string;

    @Prop({ required: true, type: String, index: 'text' })
    en_name: string;

    @Prop({ required: true,type: String, index: 'text' })
    ar_name: string;

    @Prop({ required: true })
    price: number;

    @Prop()
    sale_price: number;

    @Prop()
    en_description: string;

    @Prop()
    ar_description: string;

    @Prop({ default: [] })
    images: Image[];

    @Prop({ default: 0 })
    stock: number;

    @Prop({ default: 0 })
    average_rating: number;

    @Prop()
    ar_subtitle: string;

    @Prop()
    en_subtitle: string;

    @Prop()
    promotion_ar_title: string;

    @Prop()
    promotion_en_title: string;

    @Prop({ default: 0 })
    max_quantity: number

    @Prop()
    sku: string;

    @Prop({ default: [] })
    reviews: Review[];

    @Prop({ default: [] })
    ar_tags: Tag[];

    @Prop({ default: [] })
    en_tags: Tag[];

    @Prop({ default: [], type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
    categories: Category[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' })
    vendor: Vendor;

    @Prop({ default: false })
    is_out_of_stock: boolean;

    @Prop({ default: true })
    is_taxable: boolean;

    @Prop({ default: false })
    is_on_sale: boolean;

    @Prop({ default: true })
    require_shipping: boolean;

    @Prop({ default: false })
    is_featured: boolean;

    @Prop({ default: false })
    is_published: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product)
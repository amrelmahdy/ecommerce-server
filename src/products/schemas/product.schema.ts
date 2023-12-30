import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from './../../categories/schemas/category.schema'
import mongoose from 'mongoose';


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

@Schema({
    timestamps: true
})

export class Product {
    @Prop({ required: true })
    slug: string;

    @Prop({ required: true })
    en_name: string;

    @Prop({ required: true })
    ar_name: string;

    @Prop({ required: true })
    price: string;

    @Prop()
    new_price: string;

    @Prop()
    en_description: string;

    @Prop()
    ar_description: string;

    @Prop({ default: [] })
    images: Buffer[];

    @Prop({ default: 0 })
    stock: number;

    @Prop({ default: 0 })
    ratings: number;

    @Prop({ default: [] })
    reviews: Review[];

    @Prop({ default: false })
    is_sale: boolean;

    @Prop({ default: false })
    is_out_of_stock: boolean;

    @Prop({ default: [], type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    categories: Category[];
}

export const ProductSchema = SchemaFactory.createForClass(Category)
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
 import { Image } from "src/utils/schemas";


@Schema({
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
})
export class Category {
    @Prop({ required: true })
    ar_name: string;

    @Prop({ required: true })
    en_name: string;

    @Prop({ required: true })
    slug: string;

    @Prop({
        default: {
            url: "https://res.cloudinary.com/dbe5ygqci/image/upload/v1705917290/categories/placeholder-img-150x150_msonso.png",
            width: 150,
            height: 150
        }
    })
    image: Image;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    parent?: Category;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
    sub_categories?: Category[];
}


export const CategorySchema = SchemaFactory.createForClass(Category)
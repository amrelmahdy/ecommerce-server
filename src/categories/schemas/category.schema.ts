import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

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

    @Prop({ default: "/public/dist/img/placeholder.png" })
    image: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    parent?: Category;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
    sub_categories?: Category[];
    
    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    // products: string;
}


export const CategorySchema = SchemaFactory.createForClass(Category)
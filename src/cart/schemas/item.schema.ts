import { Prop, SchemaFactory } from "@nestjs/mongoose";
import  { Types } from "mongoose";
import { Product } from "src/products/schemas/product.schema";


export class Item {
    @Prop({ type: Types.ObjectId, ref: 'Product' })
    product: Product;

    @Prop({ type: Number })
    quantity: number
}

export const itemSchema = SchemaFactory.createForClass(Item);
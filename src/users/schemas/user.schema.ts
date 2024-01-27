import { SchemaFactory, Prop, Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Address } from "src/addresses/schemas/address.schema";
import { Product } from "src/products/schemas/product.schema";


@Schema({
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            //delete ret._id;
            delete ret.__v;
            delete ret.password;
            return ret;
        }
    }
})

export class User {

    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    email: string

    @Prop({ required: true })
    phone: string

    @Prop({ default: "assets/images/placeholder-img-150x150.png" })
    image: string;
    
    @Prop({ required: true })
    password: string

    @Prop({ default: false })
    is_verified: boolean

    @Prop( { default: 0 })
    role: number
   
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], default: [] })
    wish_list: Product[]

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }], default: [] })
    addresses: Address[]


    
    
 // orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],

    // name: {
    //     type: String,
    //     required: true,
    // },
    // email: {
    //     type: String,
    //     index: true,
    //     unique: true,
    //     lowercase: true,
    //     required: true,
    // },
    // mobile: String,
    // isVerified: {
    //     type: Boolean,
    //     default: false
    // },
    // password: {
    //     type: String,
    //     //select: false,
    // },

    // role: {
    //     type: Number,
    //     default: 0 //  User by default
    // },
    // orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    // addresses: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
    // paymentMethods: [{ type: Schema.Types.ObjectId, ref: 'PaymentMethod' }]

}


export const userSchema = SchemaFactory.createForClass(User)
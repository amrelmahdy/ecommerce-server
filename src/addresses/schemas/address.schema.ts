import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/users/schemas/user.schema";


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
export class Address {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    phone: string

    @Prop({ required: true })
    country: string;

    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    district: string;

    @Prop({ required: true })
    street: string;

    @Prop({ required: true })
    building: string;

    @Prop({ required: true })
    postal_code: string;

    @Prop()
    landmark: string;

    @Prop()
    address_description: string;

    @Prop({ required: true, default: false })
    is_default: Boolean
}

export const addressSchema = SchemaFactory.createForClass(Address);
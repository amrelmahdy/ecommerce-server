import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


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

export class Vendor {
    @Prop({ required: true })
    ar_name: string;

    @Prop({ required: true })
    en_name: string;

    @Prop({ required: true })
    slug: string;
}

export const vendorSchema = SchemaFactory.createForClass(Vendor);
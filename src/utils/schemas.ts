
import { SchemaFactory } from "@nestjs/mongoose";

export class Image {
    public_id: string;
    url: string;
    width: number;
    height: number;
}

export const itemSchema = SchemaFactory.createForClass(Image);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @ApiProperty({ type: String, required: true, example: 'Product Name' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ type: String, required: true, example: 'Product Description' })
  @Prop()
  description: string;

  @ApiProperty({ type: Number, required: true, example: 1000 })
  @Prop({ required: true })
  price: number;

  @ApiProperty({ type: String, required: false, example: 'Product Category' })
  @Prop()
  category: string;

  @ApiProperty({ type: String, required: false, example: 'Product Brand' })
  @Prop()
  brand: string;

  @ApiProperty({ type: 'string', required: true, format: 'binary' })
  @Prop({ required: true })
  image: string;

  @ApiProperty({ type: Number, required: true, example: 10 })
  @Prop({ required: true })
  stock: number;

  @ApiProperty({ type: String, required: true, example: '123456' })
  @Prop({ required: true })
  sku: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

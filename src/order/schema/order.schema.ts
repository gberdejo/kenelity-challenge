import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from 'src/product/schema/product.schema';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Order extends Document {
  @ApiProperty({ type: [Product], required: true, example: [] })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }], required: true })
  products: Product[];

  @ApiProperty({ type: String, required: true, example: '12345678' })
  @Prop({ required: true })
  dni: string;

  @ApiProperty({ type: String, required: true, example: 'John Doe' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ type: String, required: true, example: '987654321' })
  @Prop({ required: true })
  phone: string;

  @ApiProperty({ type: String, required: true, example: '123 Main St' })
  @Prop({ required: true })
  address: string;

  @ApiProperty({ type: String, required: true, example: 180 })
  @Prop({ required: true })
  subtotal: number;

  @ApiProperty({ type: String, required: true, example: 180 })
  @Prop({ required: true })
  discount: number;

  @ApiProperty({ type: String, required: true, example: 180 })
  @Prop({ required: true })
  iva: number;

  @ApiProperty({ type: String, required: true, example: 180 })
  @Prop({ required: true })
  total: number;

  @ApiProperty({
    type: Date,
    required: true,
    example: '2021-09-01T00:00:00.000Z',
  })
  @Prop({ default: Date.now })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

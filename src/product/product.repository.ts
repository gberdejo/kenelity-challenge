import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schema/product.schema';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createProductDto: any): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findAllBySkus(skus: string[]): Promise<Product[]> {
    return this.productModel.find({ sku: { $in: skus } }).exec();
  }

  async findOne(sku: string): Promise<Product> {
    return this.productModel.findOne({ sku }).exec();
  }

  async update(sku: string, updateProductDto: any): Promise<Product> {
    return this.productModel
      .findOneAndUpdate({ sku }, { $set: updateProductDto }, { new: true })
      .exec();
  }

  async delete(sku: string): Promise<Product> {
    return this.productModel
      .findOneAndDelete({
        sku,
      })
      .exec();
  }
}

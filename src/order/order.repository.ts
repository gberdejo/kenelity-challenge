import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Order } from './schema/order.schema';
import { CreateOrder } from './order.interface';

@Injectable()
export class OrderRepository {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(createOrder: CreateOrder): Promise<Order> {
    const createdOrder = new this.orderModel(createOrder);

    console.log('[OrderRepository] create', createOrder);

    return createdOrder.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().populate('products').exec();
  }

  async findOne(id: string): Promise<Order> {
    return this.orderModel
      .findById(new MongooseSchema.ObjectId(id))
      .populate('products')
      .exec();
  }

  async findOrdersFromLastMonth(): Promise<Order[]> {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    return this.orderModel
      .find({
        createdAt: { $gte: lastMonth },
      })
      .exec();
  }

  async update(id: string, updateOrderDto: CreateOrder): Promise<Order> {
    return this.orderModel
      .findByIdAndUpdate(new MongooseSchema.ObjectId(id), updateOrderDto, {
        new: true,
      })
      .exec();
  }

  async delete(id: string): Promise<Order> {
    return this.orderModel
      .findByIdAndDelete(new MongooseSchema.ObjectId(id))
      .exec();
  }

  async findOrderWithHighestTotal(): Promise<Order> {
    return this.orderModel
      .findOne()
      .sort({ total: -1 })
      .populate('products')
      .exec();
  }
}

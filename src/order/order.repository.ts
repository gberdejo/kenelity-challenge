import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './schema/order.schema';
import { CreateOrder } from './order.interface';

@Injectable()
export class OrderRepository {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(createOrder: CreateOrder): Promise<Order> {
    const createdOrder = new this.orderModel(createOrder);

    Logger.log('[OrderRepository] create', createOrder);

    return createdOrder.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().populate('products').exec();
  }

  async findOne(id: string): Promise<Order> {
    return this.orderModel
      .findById(new Types.ObjectId(id))
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

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.orderModel
      .findByIdAndUpdate(new Types.ObjectId(id), updateOrderDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Order> {
    return this.orderModel.findByIdAndDelete(new Types.ObjectId(id)).exec();
  }
}

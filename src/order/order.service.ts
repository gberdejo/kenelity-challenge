import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './order.repository';
import { ProductRepository } from '../product/product.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    Logger.log('[OrderService] createOrderDto', createOrderDto);

    const products = await this.productRepository.findAllBySkus(
      createOrderDto.products,
    );

    if (products.length !== createOrderDto.products.length) {
      throw new NotFoundException('Product not found');
    }

    Logger.log('[OrderService] products', products);

    const subtotal = products.reduce((acc, product) => acc + product.price, 0);

    const discount = createOrderDto.discount || 0;
    const iva = (subtotal - discount) * 0.18; // IVA in Peru is 18%
    const total = subtotal - discount + iva;

    return this.orderRepository.create({
      products,
      subtotal,
      discount,
      iva,
      total,
      dni: createOrderDto.dni,
      email: createOrderDto.email,
      address: createOrderDto.address,
      phone: createOrderDto.phone,
      name: createOrderDto.name,
    });
  }

  async findAll() {
    return this.orderRepository.findAll();
  }

  async getTotalSalesLastMonth(): Promise<any> {
    const orders = await this.orderRepository.findOrdersFromLastMonth();
    console.log(orders);
    const totalSales = orders.reduce((total, order) => total + order.total, 0);

    return {
      totalSales,
      numberOfOrders: orders.length,
    };
  }

  async findOne(id: string) {
    return this.orderRepository.findOne(id);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.update(id, updateOrderDto);
  }

  async remove(id: string) {
    const order = await this.orderRepository.findOne(id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return this.orderRepository.delete(id);
  }
}

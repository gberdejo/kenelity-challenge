import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './order.repository';
import { ProductRepository } from '../product/product.repository';
import { Product } from 'src/product/schema/product.schema';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  private uniqueIds(list: any[]) {
    const unique = new Set(list);
    return unique.size === list.length;
  }

  async create(createOrderDto: CreateOrderDto) {
    console.log('[OrderService] createOrderDto', createOrderDto);

    const listProducts: string[] = createOrderDto.products.map(
      (product) => product.sku,
    );

    if (!this.uniqueIds(listProducts)) {
      throw new BadRequestException('Products must be unique');
    }

    const products: Product[] =
      await this.productRepository.findAllBySkus(listProducts);

    if (products.length !== createOrderDto.products.length) {
      throw new NotFoundException('Product not found');
    }

    console.log('[OrderService] products', products);
    const listProductCombined = createOrderDto.products.map((product) => ({
      ...product,
      ...products.find((p) => p.sku === product.sku).toJSON(),
    }));

    console.log('[OrderService] listProductCombined', listProductCombined);

    const { subtotal, iva, total } = this.calculateTotal(
      listProductCombined,
      Number(createOrderDto.discount),
    );

    return this.orderRepository.create({
      products,
      subtotal,
      discount: createOrderDto.discount,
      iva,
      total,
      dni: createOrderDto.dni,
      email: createOrderDto.email,
      address: createOrderDto.address,
      phone: createOrderDto.phone,
      name: createOrderDto.name,
    });
  }

  calculateTotal(products: any[], discount: number) {
    console.log('[OrderService] products', products);
    console.log('[OrderService] discount', discount);
    const sum = products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0,
    );
    const subtotal = sum - discount;
    const iva = Math.round(subtotal * 0.18);
    const total = subtotal - iva;
    return {
      subtotal,
      iva,
      total,
    };
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
    console.log('[OrderService] updateOrderDto', updateOrderDto);

    const listProducts: string[] = updateOrderDto.products.map(
      (product) => product.sku,
    );

    if (!this.uniqueIds(listProducts)) {
      throw new BadRequestException('Products must be unique');
    }

    const products: Product[] =
      await this.productRepository.findAllBySkus(listProducts);

    if (products.length !== updateOrderDto.products.length) {
      throw new NotFoundException('Product not found');
    }

    console.log('[OrderService] products', products);

    const listProductCombined = updateOrderDto.products.map((product) => ({
      ...product,
      ...products.find((p) => p.sku === product.sku),
    }));

    console.log('[OrderService] listProductCombined', listProductCombined);

    const { subtotal, iva, total } = this.calculateTotal(
      listProductCombined,
      updateOrderDto.discount,
    );

    return this.orderRepository.update(id, {
      products,
      subtotal,
      discount: updateOrderDto.discount,
      iva,
      total,
      dni: updateOrderDto.dni,
      email: updateOrderDto.email,
      address: updateOrderDto.address,
      phone: updateOrderDto.phone,
      name: updateOrderDto.name,
    });
  }

  async remove(id: string) {
    const order = await this.orderRepository.findOne(id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return this.orderRepository.delete(id);
  }

  async findOrderWithHighestTotal() {
    return this.orderRepository.findOrderWithHighestTotal();
  }
}

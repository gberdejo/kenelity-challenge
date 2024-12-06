import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Order } from './schema/order.schema';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create order' })
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully created.',
    type: Order,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({
    status: 200,
    description: 'Return all orders.',
    type: [Order],
  })
  findAll() {
    return this.orderService.findAll();
  }

  @Get('totalSalesLastMonth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get total sales of the last month' })
  @ApiResponse({
    status: 200,
    description: 'Return the total sales of the last month.',
  })
  async getTotalSalesLastMonth() {
    return this.orderService.getTotalSalesLastMonth();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get order by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the order.',
    type: Order,
  })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update order' })
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully updated.',
    type: Order,
  })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete order' })
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully deleted.',
    type: Order,
  })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}

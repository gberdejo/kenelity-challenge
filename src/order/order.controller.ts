import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { Order } from './schema/order.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FindOneParams } from './dto/find-one.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create order' })
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully created.',
    type: Order,
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get order by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the order.',
    type: Order,
  })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Order ID',
    example: '67523d8223c77407902a4f7c',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  findOne(@Param() params: FindOneParams) {
    return this.orderService.findOne(params.id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update order' })
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully updated.',
    type: Order,
  })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Order ID',
    example: '67523d8223c77407902a4f7c',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param() params: FindOneParams,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(params.id, updateOrderDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete order' })
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully deleted.',
    type: Order,
  })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Order ID',
    example: '67523d8223c77407902a4f7c',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  remove(@Param() params: FindOneParams) {
    return this.orderService.remove(params.id);
  }
}

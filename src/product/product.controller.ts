import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UsePipes,
  ValidationPipe,
  Put,
  HttpCode,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Product } from './schema/product.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { FindOneParams } from './dto/find-one.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully created.',
    type: Product,
  })
  @ApiResponse({ status: 409, description: 'Conflict.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const body = plainToClass(CreateProductDto, createProductDto);
    const errors = await validate(body);

    if (errors.length > 0) {
      console.log(errors);
      const errorMessages = errors.map((err) => ({
        property: err.property,
        constraints: err.constraints,
      }));
      throw new BadRequestException({
        message: 'Validation failed',
        errors: errorMessages,
      });
    }

    const base64Image = file.buffer.toString('base64');
    createProductDto.image = base64Image;
    return this.productService.create(createProductDto);
  }

  @Get(':sku/image')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get product by sku' })
  @ApiResponse({ status: 200, description: 'Return the product.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiParam({
    name: 'sku',
    type: String,
    description: 'Product SKU',
    example: '123456',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getImage(@Param() params: FindOneParams, @Res() res: Response) {
    try {
      const imageBase64 = await this.productService.getImageBySku(params.sku);

      const imgBuffer = Buffer.from(imageBase64, 'base64');
      res.writeHead(HttpStatus.OK, {
        'Content-Type': 'image/jpeg',
        'Content-Length': imgBuffer.length,
      });
      res.end(imgBuffer);
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Return all products.' })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':sku')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get product by sku' })
  @ApiResponse({ status: 200, description: 'Return the product.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiParam({
    name: 'sku',
    type: String,
    description: 'Product SKU',
    example: '123456',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  findOne(@Param() params: FindOneParams) {
    return this.productService.findOne(params.sku);
  }

  @Put(':sku')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update product' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiParam({
    name: 'sku',
    type: String,
    description: 'Product SKU',
    example: '123456',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param() params: FindOneParams,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(params.sku, updateProductDto);
  }

  @Delete(':sku')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete product' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiParam({
    name: 'sku',
    type: String,
    description: 'Product SKU',
    example: '123456',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  remove(@Param() params: FindOneParams) {
    return this.productService.remove(params.sku);
  }
}

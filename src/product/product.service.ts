import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(createProductDto: CreateProductDto) {
    Logger.log('[ProductService] createProductDto', createProductDto);
    const sku = await this.findOne(createProductDto.sku);

    if (sku) {
      throw new ConflictException('Sku already exists');
    }

    return this.productRepository.create(createProductDto);
  }

  async findAll() {
    return this.productRepository.findAll();
  }

  async findOne(sku: string) {
    return this.productRepository.findOne(sku);
  }

  async update(sku: string, updateProductDto: UpdateProductDto) {
    Logger.log('[ProductService] sku', sku);
    Logger.log('[ProductService] updateProductDto', updateProductDto);

    const skuExists = await this.findOne(sku);

    if (!skuExists) {
      throw new NotFoundException('Sku does not exist');
    }

    return this.productRepository.update(sku, updateProductDto);
  }

  async remove(sku: string) {
    const skuExists = await this.findOne(sku);

    if (!skuExists) {
      throw new NotFoundException('Sku does not exist');
    }
    return this.productRepository.delete(sku);
  }

  async getImageBySku(sku: string): Promise<string> {
    const product = await this.findOne(sku);

    if (!product || !product.image) {
      throw new NotFoundException('Product or image not found');
    }

    return product.image;
  }
}

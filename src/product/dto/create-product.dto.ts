import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Samsung s24' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Celular de alta gama' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 1000 })
  @IsNumberString()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 'Celular' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 'Samsung' })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  image: string;

  @ApiProperty({ example: 10 })
  @IsNumberString()
  @IsNotEmpty()
  stock: number;

  @ApiProperty({ example: '123456' })
  @IsString()
  @IsNotEmpty()
  sku: string;
}

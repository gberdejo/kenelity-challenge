import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsInt } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ example: 'Samsung s24' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'Celular de alta gama' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 1000 })
  @IsNumber()
  @IsInt()
  price?: number;

  @ApiProperty({ example: 'Celular' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ example: 'Samsung' })
  @IsString()
  @IsOptional()
  brand?: string;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @IsInt()
  stock?: number;
}

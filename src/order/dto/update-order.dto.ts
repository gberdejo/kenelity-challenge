import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class ItemOrderDto {
  @ApiProperty({ example: '123456', required: true })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({ example: 1, required: true })
  @IsNumber()
  @IsInt()
  quantity: number;
}

export class UpdateOrderDto {
  @ApiProperty({
    type: [ItemOrderDto],
    example: [{ sku: '123456', quantity: 1 }],
  })
  @IsArray()
  @ArrayNotEmpty()
  products: ItemOrderDto[];

  @ApiProperty({ example: '75652677' })
  @IsNumber()
  @IsInt()
  dni: number;

  @ApiProperty({ example: 'Gabriel Berdejo' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '987654321' })
  @IsNumber()
  @IsInt()
  phone: number;

  @ApiProperty({ example: '123 Main St' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'gabrielberdejo96@gmail.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @IsInt()
  discount: number;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
} from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ type: [String], example: ['123456'] })
  @IsArray()
  @ArrayNotEmpty()
  products: string[];

  @ApiProperty({ example: '75652677' })
  @IsNumber()
  @IsInt()
  @Max(7)
  dni: number;

  @ApiProperty({ example: 'Gabriel Berdejo' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '987654321' })
  @IsNumber()
  @IsInt()
  @Max(9)
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

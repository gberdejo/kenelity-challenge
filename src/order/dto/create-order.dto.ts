import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ type: [String], example: ['123456'] })
  products: string[];

  @ApiProperty({ example: '75652677' })
  dni: string;

  @ApiProperty({ example: 'Gabriel Berdejo' })
  name: string;

  @ApiProperty({ example: '987654321' })
  phone: string;

  @ApiProperty({ example: '123 Main St' })
  address: string;

  @ApiProperty({ example: 'gabrielberdejo96@gmail.com' })
  email: string;

  @ApiProperty({ example: 5 })
  discount: number;
}

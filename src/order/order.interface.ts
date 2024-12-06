import { Product } from 'src/product/schema/product.schema';

export interface CreateOrder {
  products: Product[];
  dni: number;
  name: string;
  phone: number;
  address: string;
  email: string;
  discount: number;
  subtotal: number;
  iva: number;
  total: number;
}

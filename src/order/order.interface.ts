import { Product } from 'src/product/schema/product.schema';

export interface CreateOrder {
  products: Product[];
  dni: string;
  name: string;
  phone: string;
  address: string;
  email: string;
  discount: number;
  subtotal: number;
  iva: number;
  total: number;
}

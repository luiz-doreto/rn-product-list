import { Product } from '@/models/product.model';

export interface ProductApi {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

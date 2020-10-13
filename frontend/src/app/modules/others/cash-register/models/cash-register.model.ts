import { Product } from '../../products/models';

export interface ProductInCart {
    product: Product;
    amount: number;
    total: number;
}
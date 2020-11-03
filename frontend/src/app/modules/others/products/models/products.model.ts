import { IngredientInProduct } from '../../ingredients/models';

export interface Product {
	id: number;
	idCategory: number;
	name: string;
	price: number;
}

export function createEmptyProduct(): Product {
	return {
		id: 0,
		idCategory: 0,
		name: '',
		price: 0
	} as Product;
}

export interface ProductInTicket {
	id: number;
	idTicket: number;
	name: string;
	price: number;
	amount: number;
}

// For send data to api
export interface ProductWithIngredients {
	id?: number;
	idCategory: number;
	name: string;
	price: number;
	ingredients: IngredientInProduct[];
}

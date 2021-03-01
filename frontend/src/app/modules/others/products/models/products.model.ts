import { IngredientInProduct } from '../../ingredients/models';

export interface Product {
	id: number;
	idCategory: number;
	name: string;
	price: number;
	description: string;
	image: string;
}

export function createEmptyProduct(): Product {
	return {
		id: 0,
		idCategory: 0,
		name: '',
		price: 0,
		description: '',
		image: ''
	} as Product;
}

export interface ProductInBill {
	id: number;
	idBill: number;
	name: string;
	price: number;
	amount: number;
}

// For send data to api
export interface ProductIngredientsFile extends Product {
	ingredients: IngredientInProduct[];
	imageFile?: File | null;
}

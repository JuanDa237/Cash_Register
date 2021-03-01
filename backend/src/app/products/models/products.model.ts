export interface Product {
	id?: number;
	idCompany: number;
	idCategory: number;
	name: string;
	price: number;
	description: string;
	image: string;
	active?: boolean;
}

export interface ProductInBill {
	id?: number;
	idCompany: number;
	idBill: number;
	name: string;
	price: number;
	amount: number;
}

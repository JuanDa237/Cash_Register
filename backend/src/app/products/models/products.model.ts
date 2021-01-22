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

export interface ProductInTicket {
	id?: number;
	idCompany: number;
	idTicket: number;
	name: string;
	price: number;
	amount: number;
}

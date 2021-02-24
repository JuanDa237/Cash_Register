export interface Bill {
	id: number;
	idClient: number;
	creationDate: string;
	total: number;
	homeDelivery: number;
}

export function createEmptyBill(): Bill {
	return {
		id: 0,
		idClient: 0,
		creationDate: '',
		homeDelivery: 0
	} as Bill;
}

// For send data to api
export interface BillWithProducts {
	id?: number;
	idClient: number;
	creationDate: string;
	total?: number;
	homeDelivery?: number;
	products: ProductWithAmount[];
}

export interface ProductWithAmount {
	idProduct: number;
	amount: number;
}

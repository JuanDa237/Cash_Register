export interface Bill {
	id: number;
	idClient?: number;
	clientName?: string;
	createdAt?: string;
	total: number;
	homeDelivery: number;
	idDay?: number;
	cash?: number;
}

export function createEmptyBill(): Bill {
	return {
		id: 0,
		idClient: 0,
		createdAt: '',
		homeDelivery: 0
	} as Bill;
}

// For send data to api
export interface BillWithProducts {
	id?: number;
	idClient?: number;
	clientName?: string;
	createdAt?: string;
	total?: number;
	homeDelivery?: number;
	products: ProductWithAmount[];
}

export interface ProductWithAmount {
	idProduct: number;
	amount: number;
}

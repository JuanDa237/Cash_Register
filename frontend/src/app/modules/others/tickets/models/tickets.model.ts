export interface Ticket {
	id: number;
	idClient: number;
	creationDate: string;
	total: number;
	homeDelivery: number;
}

export function createEmptyTicket(): Ticket {
	return {
		id: 0,
		idClient: 0,
		creationDate: '',
		homeDelivery: 0
	} as Ticket;
}

// For send data to api
export interface TicketWithProducts {
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

export interface Ticket {
	id: number;
	idClient: number;
	creationDate: string;
	total: number;
	homeDelivery: boolean;
	priceOfHomeDelivery: number;
}

export function createEmptyTicket(): Ticket {
	return {
		id: 0,
		idClient: 0,
		creationDate: '',
		total: 0,
		homeDelivery: false,
		priceOfHomeDelivery: 0
	} as Ticket;
}

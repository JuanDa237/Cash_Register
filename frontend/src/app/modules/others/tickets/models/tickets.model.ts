export interface Ticket {
	id?: number;
	idClient: number;
	creationDate: string;
	homeDelivery?: number;
	total?: number;
}

export function createEmptyTicket(): Ticket {
	return {
		id: 0,
		idClient: 0,
		creationDate: '',
		homeDelivery: 0
	} as Ticket;
}

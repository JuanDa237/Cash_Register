export interface Bill {
	id?: number;
	idCompany: number;
	idClient: number;
	creationDate: string;
	total: number;
	homeDelivery: number;
}
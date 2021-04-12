export interface Bill {
	id?: number;
	idCompany: number;
	idClient: number;
	total: number;
	createdAt: string;
	homeDelivery?: number;
}

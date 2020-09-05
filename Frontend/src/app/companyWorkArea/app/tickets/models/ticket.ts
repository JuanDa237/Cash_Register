export interface Ticket {
    id?: number;
    idClient: number;
    creationDate: string;
    total: number;
    homeDelivery: boolean;
    priceOfHomeDelivery: number;
};
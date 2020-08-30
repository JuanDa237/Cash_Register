export interface Ticket {
    id?: number;
    idClient: number;
    date: string;
    total: number;
    homeDelivery: boolean;
    priceOfHomeDelivery: number;
};
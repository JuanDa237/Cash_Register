import { ProductInBill } from '../../products/models';

export interface Bill {
	id?: number;
	idCompany: number;
	idClient: number;
	total: number;
	createdAt?: string;
	homeDelivery?: number;
	idDay?: number;
	active?: boolean;
}

export interface BillReq extends Bill {
	products: ProductId[];
}

export interface ProductId extends ProductInBill {
	idProduct: number;
}

export function billReqToBill(bill: BillReq): Bill {
	return {
		id: bill.id,
		idCompany: bill.idCompany,
		idClient: bill.idClient,
		total: bill.total,
		createdAt: bill.createdAt,
		homeDelivery: bill.homeDelivery,
		active: bill.active
	} as Bill;
}

export function productIdtoProductInBill(product: ProductId): ProductInBill {
	return {
		id: product.id,
		idCompany: product.idCompany,
		idBill: product.idBill,
		name: product.name,
		price: product.price,
		amount: product.amount
	} as ProductInBill;
}

export interface Company {
	id: number;
	name: string;
	image: string;
	ticketMessage: string;
	homeDeliveries: boolean;
	visible: boolean;
}

export function createEmptyCompany(): Company {
	return {
		name: '',
		image: '',
		ticketMessage: '',
		visible: false
	} as Company;
}

export interface CompanyFile extends Company {
	imageFile?: File | null;
}

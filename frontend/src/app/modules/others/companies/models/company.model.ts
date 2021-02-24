export interface Company {
	id: number;
	name: string;
	image: string;
	billMessage: string;
	homeDeliveries: boolean;
	visible: boolean;
}

export function createEmptyCompany(): Company {
	return {
		name: '',
		image: '',
		billMessage: '',
		visible: false
	} as Company;
}

export interface CompanyFile extends Company {
	imageFile?: File | null;
}

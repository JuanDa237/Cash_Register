export interface Company {
	name: String;
	image: String;
	ticketMessage: String;
}

export function createEmptyCompany(): Company {
	return {
		name: '',
		image: '',
		ticketMessage: ''
	} as Company;
}

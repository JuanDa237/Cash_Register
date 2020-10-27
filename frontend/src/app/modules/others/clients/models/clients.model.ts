export interface Client {
	id: number;
	name: string;
	address: string;
	phoneNumber: string;
	creationDate: string;
}

export function createEmptyClient(): Client {
	return {
		id: 0,
		name: '',
		address: '',
		phoneNumber: '',
		creationDate: ''
	} as Client;
}

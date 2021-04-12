export interface Client {
	id: number;
	name: string;
	address: string;
	phoneNumber: string;
	createdAt: string;
}

export function createEmptyClient(): Client {
	return {
		id: 0,
		name: '',
		address: '',
		phoneNumber: '',
		createdAt: ''
	} as Client;
}

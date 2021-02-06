export interface Admin {
	id: number;
	name: string;
	username: string;
	idCompany: number | null;
	company: string;
}

export function createEmptyAdmin(): Admin {
	return {
		id: 0,
		name: '',
		username: '',
		idCompany: null,
		company: ''
	} as Admin;
}

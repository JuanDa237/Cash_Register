export interface Payload {
	id: number;
	iat: number;
	exp: number;
}

export interface AuthUser {
	id: number;
	username: string;
	role: string;
	idCompany: number;
	company: string;
}

export interface SignInUser {
	id: number;
	name: string;
	password: string;
	role: string;
	company: string;
}

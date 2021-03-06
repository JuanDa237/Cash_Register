import bcrypt from 'bcryptjs';

export interface User {
	id?: number;
	idCompany: number;
	idRole: number;
	username: string;
	password?: string;
	name: string;
	active?: boolean;
}

export async function encryptPassword(password: string): Promise<string> {
	const salt = await bcrypt.genSalt(10);
	return bcrypt.hash(password, salt);
}

export async function validatePassword(
	enteredPassword: string,
	password: string
): Promise<boolean> {
	return await bcrypt.compare(enteredPassword, password);
}

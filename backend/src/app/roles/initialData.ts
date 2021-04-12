import pool from '../../database';

import { User } from '../users/models/index';
import { encryptPassword } from '../users/models';

// Models
import { Role } from './data';
import { Role as IRole } from './models';
import { Company } from '../companies/models';

import keys from '../../keys';

export async function createInitialData() {
	// Create initial roles
	await createRoles();

	// Create initial company and user
	await createFirstCompany();
}

async function createRoles(): Promise<any> {
	const roles: IRole[] = await (await pool).query('SELECT * FROM roles;');

	try {
		if (roles.length > 0) return;

		await Promise.all([
			await (await pool).query(`INSERT INTO roles SET name = '${Role.CASHIER}'`),
			await (await pool).query(`INSERT INTO roles SET name = '${Role.ADMIN}'`),
			await (await pool).query(`INSERT INTO roles SET name = '${Role.SUPERADMIN}'`)
		]);
		console.log('Roles created.');
	} catch (error) {
		console.error(error);
	}
}

async function createFirstCompany(): Promise<any> {
	const companies: Company[] = await (await pool).query('SELECT * FROM company;');

	if (companies.length > 0) return;

	try {
		const newCompany: any = await (await pool).query('INSERT INTO company SET ?', [
			keys.initialData.company
		]);

		const role: IRole[] = await (await pool).query(
			`SELECT id FROM roles WHERE name = '${Role.SUPERADMIN}';`
		);

		const newUser: User = {
			idCompany: newCompany.insertId,
			idRole: role[0].id,
			username: keys.initialData.user.username,
			password: await encryptPassword(keys.initialData.user.password),
			name: keys.initialData.user.name
		};

		await (await pool).query('INSERT INTO users SET ?', [newUser]);
		console.log('Company and user created.');
	} catch (error) {
		console.error(error);
	}
}

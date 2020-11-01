import pool from '../../database';

import { User } from '../users/models/index';
import { encryptPassword } from '../users/models';

import { Role } from './data';

import keys from '../../keys';

export function createInitialData() {
	//Create initial roles
	createRoles().then(() => {
		//Create initial company and user
		createFirstCompany();
	});
}

async function createRoles(): Promise<any> {
	await (await pool).query('SELECT * FROM roles;').then(async (dates: Array<any>) => {
		try {
			if (dates.length > 0) return;

			await Promise.all([
				await (await pool).query(`INSERT INTO roles SET name = '${Role.CASHIER}'`),
				await (await pool).query(`INSERT INTO roles SET name = '${Role.ADMINISTRATOR}'`),
				await (await pool).query(`INSERT INTO roles SET name = '${Role.SUPERADMIN}'`)
			]);
			console.log('Roles created.');
		} catch (error) {
			console.error(error);
		}
	});
}

async function createFirstCompany(): Promise<any> {
	(await pool).query('SELECT * FROM companies;').then(async (dates: Array<any>) => {
		try {
			if (dates.length > 0) return;

			(await pool)
				.query('INSERT INTO companies SET ?', [keys.initialData.company])
				.then(async (company) => {
					(await pool)
						.query(`SELECT id FROM roles WHERE name = '${Role.SUPERADMIN}';`)
						.then(async (roles: any[]) => {
							const newUser: User = {
								idCompany: company.insertId,
								idRole: roles[0].id,
								username: keys.initialData.user.username,
								password: await encryptPassword(keys.initialData.user.password),
								name: keys.initialData.user.name
							};

							await (await pool).query('INSERT INTO users SET ?', [newUser]);
							console.log('Company and user created.');
						});
				});
		} catch (error) {
			console.error(error);
		}
	});
}

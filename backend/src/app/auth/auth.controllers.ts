import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import pool from '../../database';
import keys from '../../keys';
import { Company } from '../companies/models';
import { Role as ERole } from '../roles/data';
import { Role } from '../roles/models';

import { User, encryptPassword, validatePassword } from '../users/models';
import { SignInUser } from './models';

class AuthControllers {
	// Post
	public async singIn(request: Request, response: Response): Promise<Response> {
		const { username, password } = request.body;

		// Get user and verify if company is active
		const user: SignInUser = (
			await (await pool).query(
				`SELECT u.id, u.name, u.password, r.name as role, c.name as company
				FROM user u
				INNER JOIN role r ON u.idRole = r.id
				INNER JOIN company c ON u.idCompany = c.id
				WHERE c.active = true AND BINARY u.username = ?`,
				[username]
			)
		)[0];

		// Validate username
		if (typeof user == 'undefined')
			return response.status(404).json({ message: 'Username not found.' });

		// Validate password
		const correctPassword: boolean = await validatePassword(password, user.password);

		if (!correctPassword) return response.status(401).json({ message: 'Password is wrong.' });

		const token: string = jwt.sign(
			{
				id: user.id
			},
			process.env.TOKEN_SECRET || keys.noEnv.TOKEN,
			{
				expiresIn: 86400 // The token expires in 24 hours
			}
		);

		return response
			.status(200)
			.header('token', token)
			.set('Access-Control-Expose-Headers', 'token')
			.json({
				name: user.name,
				role: user.role
			});
	}

	public async singUpAdmin(request: Request, response: Response): Promise<Response> {
		const { idCompany, username, name } = request.body;

		// Validate username
		const userWithUsername: User[] = await (
			await pool
		).query('SELECT id FROM user WHERE BINARY username = ?', [username]);

		if (userWithUsername.length > 0) {
			return response.status(401).json({ message: `Username '${username}' is in use.` });
		}

		const role: Role = (
			await (await pool).query('SELECT id FROM role WHERE name = ?', [ERole.ADMIN])
		)[0];

		if (typeof role == 'undefined') {
			return response.status(500).json({ message: 'Role error.' });
		}

		const company: Company = (
			await (await pool).query('SELECT name FROM company WHERE active = true AND id = ?', [
				idCompany
			])
		)[0];

		if (typeof company == 'undefined') {
			return response.status(404).json({ message: 'Company not found.' });
		}

		const newUser: User = {
			idCompany,
			idRole: role.id,
			username,
			password: await encryptPassword(company.name + '123'),
			name
		};

		const insertedNewUser: any = await (await pool).query('INSERT INTO user SET ?', [newUser]);

		return response.status(200).json({
			message: 'Saved user.',
			id: insertedNewUser.insertId,
			company: company.name
		});
	}

	public async singUpCashier(request: Request, response: Response): Promise<Response> {
		const { username, name } = request.body;
		const { idCompany } = request.user;

		// Validate username
		const userWithUsername: User[] = await (
			await pool
		).query('SELECT id FROM user WHERE BINARY username = ?', [username]);

		if (userWithUsername.length > 0) {
			return response.status(401).json({ message: `Username '${username}' is in use.` });
		}

		const role: Role = (
			await (await pool).query('SELECT id FROM role WHERE name = ?', [ERole.CASHIER])
		)[0];

		if (typeof role == 'undefined') {
			return response.status(500).json({ message: 'Role error.' });
		}

		const newUser: User = {
			idCompany,
			idRole: role.id,
			username,
			password: await encryptPassword(username + '123'),
			name
		};

		const insertedNewUser: any = await (await pool).query('INSERT INTO user SET ?', [newUser]);

		return response.status(200).json({ message: 'Saved user.', id: insertedNewUser.insertId });
	}
}

export const authControllers = new AuthControllers();

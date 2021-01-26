import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import pool from '../../database';
import keys from '../../keys';
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
				FROM users u
				INNER JOIN roles r ON u.idRole = r.id
				INNER JOIN companies c ON u.idCompany = c.id
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

	public async singUp(request: Request, response: Response): Promise<Response> {
		const { idCompany, roleName, username, password, name } = request.body;

		// Validate username
		const userWithUsername: User[] = await (
			await pool
		).query('SELECT id FROM users WHERE BINARY username = ?', [username]);

		if (userWithUsername.length > 0) {
			return response.status(401).json({ message: `Username '${username}' is in use.` });
		}

		// Validate role
		var idRole: number;

		if (roleName != null) {
			const role: Role = (
				await (await pool).query('SELECT * FROM roles WHERE name = ?', [roleName])
			)[0];

			if (typeof role != 'undefined') {
				idRole = role.id;
			} else {
				return response.status(400).json({ message: `Role '${roleName}' not found.` });
			}
		} else {
			return response.status(400).json({ message: 'No provided role.' });
		}

		const newUser: User = {
			idCompany,
			idRole,
			username,
			password: await encryptPassword(password),
			name
		};

		const insertedNewUser: any = await (await pool).query('INSERT INTO users SET ?', [newUser]);

		newUser.id = insertedNewUser.insertId;
		delete newUser.password;

		return response.status(200).json({
			message: 'Saved user.',
			user: newUser
		});
	}
}

export const authControllers = new AuthControllers();

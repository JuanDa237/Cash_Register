import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import pool from '../../database';

import { User, encryptPassword, validatePassword } from '../users/models';
import { Role } from '../roles/models';

class AuthenticationControllers {
	// Post
	public async singIn(request: Request, response: Response): Promise<Response> {
		const { username, password } = request.body;

		const user: User[] = await (
			await pool
		).query('SELECT id, password, name, idRole FROM users WHERE username = ?', [username]);

		if (user.length > 0) {
			const correctPassword: boolean = await validatePassword(password, user[0].password);

			if (correctPassword) {
				const token: string = jwt.sign(
					{
						id: user[0].id
					},
					process.env.TOKEN_SECRET || 'tokenTest',
					{
						expiresIn: 86400 // The token expires in 24 hours
					}
				);

				const role: Role[] = await (await pool).query(
					'SELECT name FROM roles WHERE id = ?',
					[user[0].idRole]
				);

				return response
					.status(200)
					.header('token', token)
					.set('Access-Control-Expose-Headers', 'token')
					.json({
						name: user[0].name,
						role: role[0].name
					});
			} else {
				return response.status(401).json({ message: 'Password is wrong.' });
			}
		} else {
			return response.status(404).json({ message: 'Username not found.' });
		}
	}

	public async singUp(request: Request, response: Response): Promise<Response> {
		const { idCompany, roleName, username, password, name } = request.body;

		// Validate username
		const userWithUsername = await (await pool).query(
			'SELECT id FROM users WHERE username = ?',
			[username]
		);

		if (userWithUsername.length > 0) {
			return response.status(401).json({ message: `Username '${username}' is in use.` });
		}

		// Validate role
		var idRole: number;

		if (roleName != null) {
			const role = await (await pool).query('SELECT * FROM roles WHERE name = ?', [roleName]);

			if (role.length > 0) {
				idRole = role[0].id;
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

		console.log(newUser);
		const insertedNewUser: any = await (await pool).query('INSERT INTO users SET ?', [newUser]);

		const exportUser = {
			id: insertedNewUser.insertId,
			idCompany: newUser.idCompany,
			idRole: newUser.idRole,
			username: newUser.username,
			name: newUser.name
		};

		return response.status(200).json({
			message: 'Saved user.',
			user: exportUser
		});
	}
}

export const authenticationControllers = new AuthenticationControllers();

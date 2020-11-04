import { Request, Response } from 'express';

// Database
import pool from '../../database';

// Models
import { User } from './models';
import { Role } from '../roles/models';

class UsersControllers {
	// Get logged user
	public async loggedUser(request: Request, response: Response): Promise<Response> {
		const user: User[] = await (
			await pool
		).query('SELECT name, idRole FROM users WHERE id = ? AND active = true;', [
			request.user.id
		]);

		const role: Role[] = await (await pool).query('SELECT name FROM roles WHERE id = ?', [
			user[0].idRole
		]);

		return response.status(200).json({
			name: user[0].name,
			role: role[0].name
		});
	}
}

export const usersControllers = new UsersControllers();

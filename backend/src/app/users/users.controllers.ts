import { Request, Response } from 'express';

// Database
import { usersFunctions } from './users.functions';
import { Company } from '../companies/models';
import pool from '../../database';
import { Role } from '../roles/data';

class UsersController {
	// Get One

	public async getUser(request: Request, response: Response): Promise<Response> {
		const user: any = await usersFunctions.getUserQuery(request.user.id, request.user.role);

		return response.status(200).json(user);
	}

	public async getCompany(request: Request, response: Response): Promise<Response> {
		const company: Company = await usersFunctions.getCompanyQuery(request.user.idCompany);

		return response.status(200).json(company);
	}

	public async getUserAndCompany(request: Request, response: Response): Promise<Response> {
		const { id, idCompany, role } = request.user;

		const user: any = await usersFunctions.getUserQuery(id, role);

		const company: Company = await usersFunctions.getCompanyQuery(idCompany);

		return response.status(200).json({ user, company });
	}

	// Get List
	public async getAdmins(request: Request, response: Response): Promise<Response> {
		const admins: any = await (await pool).query(
			`SELECT u.id, u.username, u.name, u.idCompany, c.name as company FROM users u
			INNER JOIN roles r ON u.idRole = r.id
			INNER JOIN company c ON u.idCompany = c.id
			WHERE u.active = true AND r.name = ?`,
			[Role.ADMIN]
		);

		return response.status(200).json(admins);
	}

	public async getCashiers(request: Request, response: Response): Promise<Response> {
		const admins: any = await (await pool).query(
			`SELECT u.id, u.username, u.name FROM users u
			INNER JOIN roles r ON u.idRole = r.id
			WHERE u.active = true AND r.name = ? AND u.idCompany = ?`,
			[Role.CASHIER, request.user.idCompany]
		);

		return response.status(200).json(admins);
	}

	// Put
	public async updateUser(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		var query: string = '';
		var params: any[] = [];

		if (request.user.role == Role.SUPERADMIN) {
			query = 'UPDATE users SET ? WHERE id = ?';
			params = [request.body, id];
		} else if (request.user.role == Role.ADMIN) {
			query = `UPDATE users u
			INNER JOIN roles r ON u.idRole = r.id
			INNER JOIN company c ON u.idCompany = c.id
			SET u.username = ?, u.name = ?
			WHERE u.id = ? AND r.name = ? AND c.id = ?`;
			params = [
				request.body.username,
				request.body.name,
				id,
				Role.CASHIER,
				request.user.idCompany
			];
		}

		try {
			await (await pool).query(query, params);
		} catch (error) {
			return response.status(200).json({ message: "Can't update user" });
		}
		return response.status(200).json({ message: 'User updated successfully.' });
	}

	// Delete
	public async deleteUser(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		var query: string = '';
		var params: any[] = [];

		if (request.user.role == Role.SUPERADMIN) {
			query = 'UPDATE users SET active = false WHERE id = ?';
			params = [id];
		} else if (request.user.role == Role.ADMIN) {
			query = `UPDATE users u
			INNER JOIN roles r ON u.idRole = r.id
			INNER JOIN company c ON u.idCompany = c.id
			SET u.active = false
			WHERE u.id = ? AND r.name = ? AND c.id = ?`;
			params = [id, Role.CASHIER, request.user.idCompany];
		}

		const status: any = await (await pool).query(query, params);

		if (status.affectedRows > 0) {
			return response.status(200).json({ message: 'User deleted successfully.' });
		} else {
			return response.status(404).json({ message: "Can't delete user." });
		}
	}
}

export const usersController = new UsersController();

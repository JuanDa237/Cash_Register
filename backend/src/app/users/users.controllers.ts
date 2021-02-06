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
			INNER JOIN companies c ON u.idCompany = c.id
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
}

export const usersController = new UsersController();

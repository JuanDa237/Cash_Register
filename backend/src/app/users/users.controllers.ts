import { Request, Response } from 'express';

// Database
import { usersFunctions } from './users.functions';
import { Company } from '../companies/models';

class UsersController {
	// Get

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
}

export const usersController = new UsersController();

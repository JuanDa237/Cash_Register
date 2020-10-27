import { Request, Response } from 'express';
import pool from '../../database';

class CompaniesControllers {
	//Get one
	public async getOneCompany(request: Request, response: Response): Promise<Response> {
		return (await pool)
			.query(
				'SELECT name, imageUrl, ticketMessage FROM companies WHERE id = ? AND active = true;',
				[request.user.idCompany]
			)
			.then((dates: Array<any>) => {
				if (dates.length != 0) {
					return response.status(200).json(dates[0]);
				} else {
					return response.status(404).json({ message: 'Not found.' });
				}
			});
	}
}

export const companiesControllers = new CompaniesControllers();

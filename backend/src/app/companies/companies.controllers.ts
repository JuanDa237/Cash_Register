import { Request, Response } from 'express';

// Database
import pool from '../../database';

// Models
import { Company } from './models';

class CompaniesControllers {
	//Get one
	public async getOneCompany(request: Request, response: Response): Promise<Response> {
		const company: Company[] = await (
			await pool
		).query(
			'SELECT name, imageUrl, ticketMessage FROM companies WHERE id = ? AND active = true;',
			[request.user.idCompany]
		);

		if (company.length > 0) {
			return response.status(200).json(company[0]);
		} else {
			return response.status(404).json({ message: 'Not found.' });
		}
	}

	//Post
	public async createCompany(request: Request, response: Response): Promise<Response> {
		const { name, ticketMessage, visible } = request.body;
		const image = (request.file as unknown) as {
			[fieldname: string]: Express.Multer.File;
		};

		const newCompany = await (await pool).query('INSERT INTO companies SET ?', [
			{
				name,
				ticketMessage,
				visible: visible === 'true',
				image: typeof image != 'undefined' ? image.path : ''
			}
		]);

		return response.status(200).json({
			message: 'Saved company.',
			id: newCompany.insertId
		});
	}

	//Update
	public async updateCompany(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { name, ticketMessage, visible } = request.body;
		const { image } = request.files as {
			[fieldname: string]: Express.Multer.File[];
		};

		await (await pool).query('UPDATE companies SET ? WHERE id = ?', [
			{
				name,
				ticketMessage,
				visible,
				image: typeof image != 'undefined' ? image[0].path : null
			},
			id
		]);
		return response.status(200).json({ message: 'Company updated successfully.' });
	}
}

export const companiesControllers = new CompaniesControllers();

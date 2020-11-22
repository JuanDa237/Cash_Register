import { Request, Response } from 'express';

// Database
import pool from '../../database';

// Models
import { Company } from './models';

class CompaniesControllers {
	// Get one
	public async getCompany(request: Request, response: Response): Promise<Response> {
		const company: Company[] = await (
			await pool
		).query(
			'SELECT name, image, ticketMessage, visible FROM companies WHERE id = ? AND active = true;',
			[request.user.idCompany]
		);

		if (company.length > 0) {
			return response.status(200).json(company[0]);
		} else {
			return response.status(404).json({ message: 'Not found.' });
		}
	}

	// Post
	public async createCompany(request: Request, response: Response): Promise<Response> {
		const { name, ticketMessage, visible } = request.body;
		const image = (request.file as unknown) as {
			[fieldname: string]: Express.Multer.File;
		};

		try {
			const newCompany = await (await pool).query('INSERT INTO companies SET ?', [
				{
					name,
					ticketMessage,
					visible: visible === 'true',
					image: image.path
				}
			]);

			return response.status(200).json({
				message: 'Saved company.',
				id: newCompany.insertId
			});
		} catch (error) {
			return response.status(500).json({ message: '¿No provide image?' });
		}
	}

	// Update
	public async updateCompany(request: Request, response: Response): Promise<Response> {
		const { idCompany } = request.user;
		const { name, ticketMessage, visible } = request.body;
		const image = (request.file as unknown) as {
			[fieldname: string]: Express.Multer.File;
		};

		const oldCompany: Company[] = await (
			await pool
		).query('SELECT image, visible FROM companies WHERE id = ? AND active = true;', [
			idCompany
		]);

		if (oldCompany != null) {
			await (await pool).query('UPDATE companies SET ? WHERE id = ?', [
				{
					name,
					ticketMessage,
					visible:
						typeof visible != undefined ? visible === 'true' : oldCompany[0].visible,
					image: typeof image != 'undefined' ? image.path : oldCompany[0].image
				},
				idCompany
			]);

			return response.status(200).json({ message: 'Company updated successfully.' });
		} else {
			return response.status(400).json({ message: 'Company not found.' });
		}
	}
}

export const companiesControllers = new CompaniesControllers();

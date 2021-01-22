import { Request, Response } from 'express';

// Database
import pool from '../../database';

// Models
import { Company } from './models';

class CompaniesControllers {
	// Get
	public async getCompanies(request: Request, response: Response): Promise<Response> {
		const companies: Company[] = await (await pool).query(
			'SELECT id, name, image, ticketMessage, homeDeliveries FROM companies WHERE visible = true AND active = true;'
		);
		return response.status(200).json(companies);
	}

	public async getAllCompanies(request: Request, response: Response): Promise<Response> {
		const companies: Company[] = await (await pool).query(
			'SELECT id, name, image, ticketMessage, homeDeliveries, visible FROM companies WHERE active = true;'
		);
		return response.status(200).json(companies);
	}

	// Get one
	public async getCompany(request: Request, response: Response): Promise<Response> {
		const company: Company[] = await (
			await pool
		).query(
			'SELECT name, image, ticketMessage, homeDeliveries, visible FROM companies WHERE id = ? AND active = true;',
			[request.user.idCompany]
		);

		if (company.length > 0) {
			return response.status(200).json(company[0]);
		} else {
			return response.status(404).json({ message: 'Not found.' });
		}
	}

	public async getCompanyById(request: Request, response: Response): Promise<Response> {
		const company: Company[] = await (
			await pool
		).query(
			'SELECT name, image, ticketMessage, homeDeliveries, visible FROM companies WHERE id = ? AND active = true;',
			[request.params.id]
		);

		if (company.length > 0) {
			return response.status(200).json(company[0]);
		} else {
			return response.status(404).json({ message: 'Not found.' });
		}
	}

	// Post
	public async createCompany(request: Request, response: Response): Promise<Response> {
		const { name, ticketMessage, homeDeliveries, visible } = request.body;
		const image = (request.file as unknown) as {
			[fieldname: string]: Express.Multer.File;
		};

		const newCompany = await (await pool).query('INSERT INTO companies SET ?', [
			{
				name,
				ticketMessage,
				visible: visible === 'true',
				homeDeliveries: homeDeliveries === 'true',
				image: typeof image != 'undefined' ? image.path : '',
				active: true
			}
		]);

		return response.status(200).json({
			message: 'Saved company.',
			id: newCompany.insertId
		});
	}

	// Update
	public async updateCompany(request: Request, response: Response): Promise<Response> {
		const { name, ticketMessage, homeDeliveries, visible } = request.body;
		const image = (request.file as unknown) as {
			[fieldname: string]: Express.Multer.File;
		};
		var idCompany = request.params.id;

		if (typeof idCompany == 'undefined') idCompany = request.user.idCompany;

		const oldCompany: Company[] = await (
			await pool
		).query(
			'SELECT name, ticketMessage, image, visible FROM companies WHERE id = ? AND active = true;',
			[idCompany]
		);

		if (oldCompany != null && typeof oldCompany[0] != 'undefined') {
			await (await pool).query('UPDATE companies SET ? WHERE id = ?', [
				{
					name: typeof name != 'undefined' ? name : oldCompany[0].name,
					ticketMessage:
						typeof ticketMessage != 'undefined'
							? ticketMessage
							: oldCompany[0].ticketMessage,
					visible:
						typeof visible != undefined ? visible === 'true' : oldCompany[0].visible,
					homeDeliveries:
						typeof homeDeliveries != undefined
							? homeDeliveries === 'true'
							: oldCompany[0].homeDeliveries,
					image: typeof image != 'undefined' ? image.path : oldCompany[0].image
				},
				idCompany
			]);

			return response.status(200).json({ message: 'Company updated successfully.' });
		} else {
			return response.status(400).json({ message: 'Company not found.' });
		}
	}

	// Delete
	public async deleteCompany(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		await (
			await pool
		).query('UPDATE companies SET active = false, visible = false WHERE id = ?', [id]);

		// Delete all photos
		return response.status(200).json({ message: 'Company eliminated successfully.' });
	}
}

export const companiesControllers = new CompaniesControllers();

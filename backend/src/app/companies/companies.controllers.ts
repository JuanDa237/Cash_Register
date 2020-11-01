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

	//Post
	public async createCompany(request: Request, response: Response): Promise<Response> {
		const { name, ticketMessage, visible } = request.body;
		const image = (request.file as unknown) as {
			[fieldname: string]: Express.Multer.File;
		};

		return (await pool)
			.query('INSERT INTO companies SET ?', [
				{
					name,
					ticketMessage,
					visible: visible === 'true',
					image: typeof image != 'undefined' ? image.path : ''
				}
			])
			.then((value: any) => {
				return response.status(200).json({
					message: 'Saved company.',
					id: value.insertId
				});
			});
	}

	//Update
	public async updateCompany(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { name, ticketMessage, visible } = request.body;
		const { image } = request.files as {
			[fieldname: string]: Express.Multer.File[];
		};

		return (await pool)
			.query('UPDATE companies SET ? WHERE id = ?', [
				{
					name,
					ticketMessage,
					visible,
					image: typeof image != 'undefined' ? image[0].path : null
				},
				id
			])
			.then((value) => {
				return response.status(200).json({ message: 'Company updated successfully.' });
			});
	}
}

export const companiesControllers = new CompaniesControllers();

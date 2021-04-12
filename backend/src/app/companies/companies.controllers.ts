import { Request, Response } from 'express';
import fs from 'fs-extra';
import path from 'path';

// Database
import pool from '../../database';
import { Role } from '../roles/data';

// Models
import { Company } from './models';

class CompaniesControllers {
	// Get
	public async getCompanies(request: Request, response: Response): Promise<Response> {
		const companies: Company[] = await (await pool).query(
			'SELECT id, name, image, billMessage, homeDelivery FROM company WHERE visible = true AND active = true;'
		);
		return response.status(200).json(companies);
	}

	public async getAllCompanies(request: Request, response: Response): Promise<Response> {
		const companies: Company[] = await (await pool).query(
			'SELECT id, name, image, billMessage, homeDelivery, visible FROM company WHERE active = true;'
		);
		return response.status(200).json(companies);
	}

	// Get one

	public async getCompanyById(request: Request, response: Response): Promise<Response> {
		const company: Company[] = await (
			await pool
		).query(
			'SELECT name, image, billMessage, homeDelivery, visible FROM company WHERE id = ? AND active = true;',
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
		const { name, billMessage, homeDelivery, visible } = request.body;
		const image = (request.file as unknown) as {
			[fieldname: string]: Express.Multer.File;
		};

		const newCompany = await (await pool).query('INSERT INTO company SET ?', [
			{
				name,
				billMessage,
				visible: visible === 'true',
				homeDelivery: homeDelivery === 'true',
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
		const { name, billMessage, homeDelivery, visible } = request.body;
		const image = (request.file as unknown) as {
			[fieldname: string]: Express.Multer.File;
		};

		var idCompany: number = Number(request.params.id);

		if (typeof idCompany == 'undefined' || isNaN(idCompany)) idCompany = request.user.idCompany;

		const oldCompany: Company[] = await (
			await pool
		).query(
			'SELECT name, billMessage, image, visible FROM company WHERE id = ? AND active = true;',
			[idCompany]
		);

		if (oldCompany != null && typeof oldCompany[0] != 'undefined') {
			// Delete old image
			if (typeof image != 'undefined' && oldCompany[0].image != '') {
				try {
					await fs.unlink(path.resolve(oldCompany[0].image));
				} catch (error) {}
			}

			const imagePath: string =
				typeof image != 'undefined' ? String(image.path) : oldCompany[0].image;

			await (await pool).query('UPDATE company SET ? WHERE id = ?', [
				{
					name: typeof name != 'undefined' ? name : oldCompany[0].name,
					billMessage:
						typeof billMessage != 'undefined' ? billMessage : oldCompany[0].billMessage,
					visible:
						typeof visible != undefined ? visible === 'true' : oldCompany[0].visible,
					homeDelivery:
						typeof homeDelivery != undefined
							? homeDelivery === 'true'
							: oldCompany[0].homeDelivery,
					image: imagePath
				},
				idCompany
			]);

			return response
				.status(200)
				.json({ message: 'Company updated successfully.', imagePath });
		} else {
			return response.status(400).json({ message: 'Company not found.' });
		}
	}

	// Delete
	public async deleteCompany(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const company: Company = (
			await (await pool).query('SELECT image FROM company WHERE id = ?', [id])
		)[0];

		if (typeof company != 'undefined') {
			// Delete old image
			if (company.image != '') {
				await fs.unlink(path.resolve(company.image));
			}

			await (
				await pool
			).query('UPDATE company SET active = false, visible = false WHERE id = ?', [id]);

			// Delete all company users with admin role
			await (await pool).query(
				`UPDATE user u
				INNER JOIN role r ON u.idRole = r.id
				SET u.active = false
				WHERE idCompany = ? AND r.name = ?;`,
				[id, Role.ADMIN]
			);

			return response.status(200).json({ message: 'Company deleted successfully.' });
		} else {
			return response.status(404).json({ message: 'Company not found.' });
		}
	}
}

export const companiesControllers = new CompaniesControllers();

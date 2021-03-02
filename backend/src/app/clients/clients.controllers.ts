import { Request, Response } from 'express';

// Database
import pool from '../../database';

// Models
import { Client } from './models';

class ClientsControllers {
	// Get Interval
	public async listClientsInYear(request: Request, response: Response): Promise<Response> {
		var year: number = new Date().getFullYear();

		const clients: Client[] = await (await pool).query(
			`SELECT DATE_FORMAT(creationDate, '%m') AS creationDate, active FROM clients
			WHERE creationDate >= '?-01-01' AND creationDate <= '?-12-31' AND idCompany = ?`,
			[year, year, request.user.idCompany]
		);

		return response.status(200).json(clients);
	}

	// Get All List
	public async listAllClients(request: Request, response: Response): Promise<Response> {
		const clients: Client[] = await (await pool).query(
			`SELECT id, name, address, phoneNumber, DATE_FORMAT(creationDate, '%d-%m-%Y') AS creationDate
			FROM clients WHERE idCompany = ?`,
			[request.user.idCompany]
		);
		return response.status(200).json(clients);
	}

	// Get List
	public async listClients(request: Request, response: Response): Promise<Response> {
		const clients: Client[] = await (await pool).query(
			`SELECT id, name, address, phoneNumber, DATE_FORMAT(creationDate, '%d-%m-%Y') AS creationDate
			FROM clients WHERE active = true AND idCompany = ?`,
			[request.user.idCompany]
		);
		return response.status(200).json(clients);
	}

	// Get One
	public async getClient(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const client: Client[] = await (await pool).query(
			`SELECT id, name, address, phoneNumber, DATE_FORMAT(creationDate, '%d-%m-%Y') AS creationDate
			FROM clients WHERE id = ? AND active = true AND idCompany = ?`,
			[id, request.user.idCompany]
		);
		if (client.length > 0) {
			return response.status(200).json(client[0]);
		} else {
			return response.status(404).json({ message: 'Not found.' });
		}
	}

	// Post
	public async createClient(request: Request, response: Response): Promise<Response> {
		var client: any = request.body;
		client.idCompany = request.user.idCompany;
		delete client.id;

		const newClient: any = await (await pool).query('INSERT INTO clients SET ?', [client]);

		return response.status(200).json({
			message: 'Saved client.',
			id: newClient.insertId
		});
	}

	// Update
	public async updateClient(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		await (await pool).query('UPDATE clients SET ? WHERE id = ?', [request.body, id]);
		return response.status(200).json({ message: 'Client updated successfully.' });
	}

	// Delete
	public async deleteClient(request: Request, response: Response): Promise<Response> {
		var date: Date = new Date();
		var year: string, month: string, day: string;

		year = String(date.getFullYear());
		month = String(date.getMonth() + 1);
		day = String(date.getDate());

		if (month.length == 1) {
			month = '0' + month;
		}

		if (day.length == 1) {
			day = '0' + day;
		}

		const { id } = request.params;
		var newDate: string = year + '-' + month + '-' + day;

		await (await pool).query(
			'UPDATE clients SET active = false, creationDate = ? WHERE id = ?',
			[newDate, id]
		);
		return response.status(200).json({ message: 'Client deleted successfully.' });
	}
}

export const clientsControllers = new ClientsControllers();

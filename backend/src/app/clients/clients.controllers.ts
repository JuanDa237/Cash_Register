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
			`SELECT createdAt, active FROM client
			WHERE createdAt >= '?-01-01' AND createdAt <= '?-12-31' AND idCompany = ?`,
			[year, year, request.user.idCompany]
		);

		return response.status(200).json(clients);
	}

	// Get All List
	public async listAllClients(request: Request, response: Response): Promise<Response> {
		const clients: Client[] = await (await pool).query(
			`SELECT id, name, address, phoneNumber, createdAt
			FROM client WHERE idCompany = ?`,
			[request.user.idCompany]
		);
		return response.status(200).json(clients);
	}

	// Get List
	public async listClients(request: Request, response: Response): Promise<Response> {
		const clients: Client[] = await (await pool).query(
			`SELECT id, name, address, phoneNumber, createdAt
			FROM client WHERE active = true AND idCompany = ?`,
			[request.user.idCompany]
		);
		return response.status(200).json(clients);
	}

	// Get One
	public async getClient(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const client: Client[] = await (await pool).query(
			`SELECT id, name, address, phoneNumber, createdAt
			FROM client WHERE id = ? AND active = true AND idCompany = ?`,
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
		var client: Client = request.body;
		client.idCompany = request.user.idCompany;

		delete client.id;
		delete client.createdAt;

		const newClient: any = await (await pool).query('INSERT INTO client SET ?', [client]);

		return response.status(200).json({
			message: 'Saved client.',
			id: newClient.insertId
		});
	}

	// Update
	public async updateClient(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		var client: Client = request.body;

		delete client.createdAt;
		delete client.updatedAt;

		await (await pool).query('UPDATE client SET ? WHERE id = ?', [request.body, id]);
		return response.status(200).json({ message: 'Client updated successfully.' });
	}

	// Delete
	public async deleteClient(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		await (await pool).query('UPDATE client SET active = false WHERE id = ?', [id]);
		return response.status(200).json({ message: 'Client deleted successfully.' });
	}
}

export const clientsControllers = new ClientsControllers();

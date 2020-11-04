import { Request, Response } from 'express';

// Database
import pool from '../../database';

// Models
import { Ticket } from './models';
import { ProductInTicket } from '../products/models';

// Functions
import { ticketFunctions } from './tickets.functions';

class TicketsControllers {
	// Get Interval
	public async listTicketsInInterval(request: Request, response: Response): Promise<Response> {
		const { since, until } = request.params;

		const tickets: Ticket[] = await (
			await pool
		).query(
			"SELECT id, idClient, DATE_FORMAT(creationDate, '%d-%m-%Y') AS creationDate, total, homeDelivery FROM tickets WHERE creationDate >= ? AND creationDate <= ? AND idCompany = ?",
			[since, until, request.user.idCompany]
		);

		return response.status(200).json(tickets);
	}

	public async listTicketsInYear(request: Request, response: Response): Promise<Response> {
		var year: number = new Date().getFullYear();

		const tickets: Ticket[] = await (
			await pool
		).query(
			"SELECT DATE_FORMAT(creationDate, '%m') AS creationDate, total, homeDelivery FROM tickets WHERE creationDate >= '?-01-01' AND creationDate <= '?-12-31' AND idCompany = ?",
			[year, year, request.user.idCompany]
		);

		return response.status(200).json(tickets);
	}

	// Get list
	public async listTickets(request: Request, response: Response): Promise<Response> {
		const tickets: Ticket[] = await (
			await pool
		).query(
			"SELECT id, idClient, DATE_FORMAT(creationDate, '%d-%m-%Y') AS creationDate, total, homeDelivery FROM tickets WHERE idCompany = ?",
			[request.user.idCompany]
		);

		return response.status(200).json(tickets);
	}

	public async listProductsInTickets(request: Request, response: Response): Promise<Response> {
		const productsInTickets: ProductInTicket[] = await (
			await pool
		).query('SELECT * FROM productsInTickets WHERE idCompany = ?', [request.user.idCompany]);

		return response.status(200).json(productsInTickets);
	}

	// Get one
	public async getOneTicket(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const ticket: Ticket[] = await (
			await pool
		).query(
			"SELECT id, idClient, DATE_FORMAT(creationDate, '%d-%m-%Y') AS creationDate, total, homeDelivery FROM tickets WHERE id = ? AND idCompany = ?",
			[id, request.user.idCompany]
		);

		if (ticket.length > 0) {
			return response.status(200).json(ticket[0]);
		} else {
			return response.status(404).json({ message: 'Not found' });
		}
	}

	public async getProductsInTicket(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const productsInTicket: ProductInTicket[] = await (
			await pool
		).query('SELECT * FROM productsInTickets WHERE idTicket = ? AND idCompany = ?', [
			id,
			request.user.idCompany
		]);

		if (productsInTicket.length > 0) {
			return response.status(200).json(productsInTicket);
		} else {
			return response.status(404).json({ message: 'Not found' });
		}
	}

	// Post
	public async createTicket(request: Request, response: Response): Promise<Response> {
		const idCompany: number = request.user.idCompany;
		const { total, products } = request.body;

		delete request.body.products;
		delete request.body.total;
		if (request.body.homeDelivery <= 0) delete request.body.homeDelivery;

		const finalTotal =
			typeof total != 'undefined'
				? total
				: await ticketFunctions.getTotalOfTicket(products, request.body.homeDelivery);

		var ticket: Ticket = request.body;
		ticket.idCompany = idCompany;
		ticket.total = finalTotal;

		const newTicket: any = await (await pool).query('INSERT INTO tickets SET ?', [ticket]);

		await ticketFunctions.doThingsNeededForNewTicket(products, newTicket.insertId, idCompany);

		return response.status(200).json({
			message: 'Saved ticket.',
			id: newTicket.insertId,
			total: finalTotal != total ? finalTotal : undefined
		});
	}
}

export const ticketsControllers = new TicketsControllers();

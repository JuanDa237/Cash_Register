import { Request, Response } from 'express';

import pool from '../../database';

class TicketsControllers {
	//Get Interval
	public async listTicketsInInterval(request: Request, response: Response): Promise<Response> {
		const { since, until } = request.params;
		return (await pool)
			.query(
				"SELECT id, idClient, DATE_FORMAT(creationDate, '%d-%m-%Y') AS creationDate, total, homeDelivery, priceOfHomeDelivery FROM tickets WHERE creationDate >= ? AND creationDate <= ? AND idCompany = ?",
				[since, until, request.user.idCompany]
			)
			.then((dates) => {
				return response.status(200).json(dates);
			});
	}

	public async listTicketsInYear(request: Request, response: Response): Promise<Response> {
		var year: number = new Date().getFullYear();

		return (await pool)
			.query(
				"SELECT DATE_FORMAT(creationDate, '%m') AS creationDate, total, homeDelivery FROM tickets WHERE creationDate >= '?-01-01' AND creationDate <= '?-12-31' AND idCompany = ?",
				[year, year, request.user.idCompany]
			)
			.then((dates) => {
				return response.status(200).json(dates);
			});
	}

	//Get list
	public async listTickets(request: Request, response: Response): Promise<Response> {
		return (await pool)
			.query(
				"SELECT id, idClient, DATE_FORMAT(creationDate, '%d-%m-%Y') AS creationDate, total, homeDelivery, priceOfHomeDelivery FROM tickets WHERE idCompany = ?",
				[request.user.idCompany]
			)
			.then((dates) => {
				return response.status(200).json(dates);
			});
	}

	public async listProductsInTickets(request: Request, response: Response): Promise<Response> {
		return (await pool)
			.query('SELECT * FROM productsInTickets WHERE idCompany = ?', [request.user.idCompany])
			.then((dates) => {
				return response.status(200).json(dates);
			});
	}

	//Get one
	public async getOneTicket(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		return (await pool)
			.query(
				"SELECT id, idClient, DATE_FORMAT(creationDate, '%d-%m-%Y') AS creationDate, total, homeDelivery, priceOfHomeDelivery FROM tickets WHERE id = ? AND idCompany = ?",
				[id, request.user.idCompany]
			)
			.then((dates: Array<any>) => {
				if (dates.length != 0) {
					return response.status(200).json(dates[0]);
				} else {
					return response.status(404).json({ message: 'Not found' });
				}
			});
	}

	public async getProductsInTicket(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		return (await pool)
			.query('SELECT * FROM productsInTickets WHERE idTicket = ? AND idCompany = ?', [
				id,
				request.user.idCompany
			])
			.then((dates) => {
				if (dates != 0) {
					return response.status(200).json(dates);
				} else {
					return response.status(404).json({ message: 'Not found' });
				}
			});
	}

	//Post
	public async createTicket(request: Request, response: Response): Promise<Response> {
		request.body.idCompany = request.user.idCompany;
		return (await pool)
			.query('INSERT INTO tickets SET ?', [request.body])
			.then(async function (value) {
				//Edit this
				return response.status(200).json({
					message: 'Saved ticket.',
					id: value.insertId
				});
			});
	}

	public async createProductInTicket(request: Request, response: Response): Promise<Response> {
		request.body.idCompany = request.user.idCompany;
		return (await pool)
			.query('INSERT INTO productsInTickets SET ?', [request.body])
			.then((value) => {
				return response.status(200).json({ message: 'Saved product in ticket.' });
			});
	}
}

export const ticketsControllers = new TicketsControllers();

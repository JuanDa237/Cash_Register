import { Request, Response } from 'express';

// Database
import pool from '../../database';

// Models
import { Bill } from './models';
import { ProductInBill } from '../products/models';

// Functions
import { billFunctions } from './bills.functions';
import { Company } from '../companies/models';

class BillsControllers {
	// Get Interval
	public async listBillsInInterval(request: Request, response: Response): Promise<Response> {
		const { since, until } = request.params;

		const bills: Bill[] = await (
			await pool
		).query(
			"SELECT id, idClient, DATE_FORMAT(creationDate, '%d-%m-%Y') AS creationDate, total, homeDelivery FROM bills WHERE creationDate >= ? AND creationDate <= ? AND idCompany = ?",
			[since, until, request.user.idCompany]
		);

		return response.status(200).json(bills);
	}

	public async listBillsInYear(request: Request, response: Response): Promise<Response> {
		var year: number = new Date().getFullYear();

		const bills: Bill[] = await (
			await pool
		).query(
			"SELECT DATE_FORMAT(creationDate, '%m') AS creationDate, total, homeDelivery FROM bills WHERE creationDate >= '?-01-01' AND creationDate <= '?-12-31' AND idCompany = ?",
			[year, year, request.user.idCompany]
		);

		return response.status(200).json(bills);
	}

	// Get list
	public async listBills(request: Request, response: Response): Promise<Response> {
		const bills: Bill[] = await (
			await pool
		).query(
			"SELECT id, idClient, DATE_FORMAT(creationDate, '%d-%m-%Y') AS creationDate, total, homeDelivery FROM bills WHERE idCompany = ?",
			[request.user.idCompany]
		);

		return response.status(200).json(bills);
	}

	public async listProductsInBills(request: Request, response: Response): Promise<Response> {
		const productsInBills: ProductInBill[] = await (
			await pool
		).query('SELECT * FROM productsInBills WHERE idCompany = ?', [request.user.idCompany]);

		return response.status(200).json(productsInBills);
	}

	// Get one
	public async getOneBill(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const bill: Bill[] = await (
			await pool
		).query(
			"SELECT id, idClient, DATE_FORMAT(creationDate, '%d-%m-%Y') AS creationDate, total, homeDelivery FROM bills WHERE id = ? AND idCompany = ?",
			[id, request.user.idCompany]
		);

		if (bill.length > 0) {
			return response.status(200).json(bill[0]);
		} else {
			return response.status(404).json({ message: 'Not found' });
		}
	}

	public async getProductsInBill(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const productsInBill: ProductInBill[] = await (
			await pool
		).query('SELECT * FROM productsInBills WHERE idBill = ? AND idCompany = ?', [
			id,
			request.user.idCompany
		]);

		if (productsInBill.length > 0) {
			return response.status(200).json(productsInBill);
		} else {
			return response.status(404).json({ message: 'Not found' });
		}
	}

	// Post
	public async createBill(request: Request, response: Response): Promise<Response> {
		const idCompany: number = request.user.idCompany;
		const { products } = request.body;

		delete request.body.products;

		if (request.body.homeDelivery <= 0) {
			delete request.body.homeDelivery;
		} else if (typeof request.body.homeDelivery != 'undefined') {
			// Company have homeDeliveries?
			const company: Company[] = await (
				await pool
			).query('SELECT homeDeliveries FROM companies WHERE id = ? AND active = true;', [
				idCompany
			]);

			if (!company[0].homeDeliveries)
				return response.status(409).json({
					message: 'Home deliveries are disabled.'
				});
		}

		const finalTotal = await billFunctions.getTotalOfBill(products, request.body.homeDelivery);

		var bill: Bill = request.body;
		bill.idCompany = idCompany;
		bill.total = finalTotal;

		const newBill: any = await (await pool).query('INSERT INTO bills SET ?', [bill]);

		await billFunctions.doThingsNeededForNewBill(products, newBill.insertId, idCompany);

		return response.status(200).json({
			message: 'Saved bill.',
			id: newBill.insertId,
			total: finalTotal
		});
	}
}

export const billsControllers = new BillsControllers();

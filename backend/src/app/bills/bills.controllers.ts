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
			'SELECT id, idClient, createdAt, total, homeDelivery FROM bill WHERE DATE(createdAt) >= ? AND DATE(createdAt) <= ? AND idCompany = ?',
			[since, until, request.user.idCompany]
		);

		return response.status(200).json(bills);
	}

	public async listBillsInYear(request: Request, response: Response): Promise<Response> {
		const bills: Bill[] = await (
			await pool
		).query(
			'SELECT MONTH(createdAt) createdAt, total, homeDelivery FROM bill WHERE YEAR(createdAt) = YEAR(CURDATE()) AND idCompany = ?',
			[request.user.idCompany]
		);

		return response.status(200).json(bills);
	}

	// Get list
	public async listBills(request: Request, response: Response): Promise<Response> {
		const bills: Bill[] = await (
			await pool
		).query(
			'SELECT id, idClient, createdAt, total, homeDelivery FROM bill WHERE idCompany = ?',
			[request.user.idCompany]
		);

		return response.status(200).json(bills);
	}

	public async listProductsInBills(request: Request, response: Response): Promise<Response> {
		const productsInBills: ProductInBill[] = await (
			await pool
		).query('SELECT * FROM billsHasProducts WHERE idCompany = ?', [request.user.idCompany]);

		return response.status(200).json(productsInBills);
	}

	// Get one
	public async getBill(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const bill: Bill[] = await (
			await pool
		).query(
			'SELECT id, idClient, createdAt, total, homeDelivery FROM bill WHERE id = ? AND idCompany = ?',
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
		).query('SELECT * FROM billsHasProducts WHERE idBill = ? AND idCompany = ?', [
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

		console.log(request.body);
		delete request.body.products;

		if (request.body.homeDelivery <= 0) {
			delete request.body.homeDelivery;
		} else if (typeof request.body.homeDelivery != 'undefined') {
			// Company have homeDeliveries?
			const company: Company = (
				await (
					await pool
				).query('SELECT homeDelivery FROM company WHERE id = ? AND active = true;', [
					idCompany
				])
			)[0];

			if (!company.homeDelivery) {
				return response.status(409).json({
					message: 'Home deliveries are disabled.'
				});
			}
		}

		const finalTotal = await billFunctions.getTotalOfBill(products, request.body.homeDelivery);

		var bill: Bill = request.body;
		bill.idCompany = idCompany;
		bill.total = finalTotal;

		const newBill: any = await (await pool).query('INSERT INTO bill SET ?', [bill]);

		await billFunctions.doThingsNeededForNewBill(products, newBill.insertId, idCompany);

		return response.status(200).json({
			message: 'Saved bill.',
			id: newBill.insertId,
			total: finalTotal
		});
	}

	// Delete
	public async deleteBill(request: Request, response: Response): Promise<Response> {
		return response.status(200).json({ message: 'Bill deleted.' });
	}
}

export const billsControllers = new BillsControllers();

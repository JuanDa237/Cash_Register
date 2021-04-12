import { Request, Response } from 'express';

// Database
import pool from '../../database';

// Models
import { Bill, BillReq } from './models';
import { ProductInBill } from '../products/models';

// Functions
import { billFunctions } from './bills.functions';

class BillsControllers {
	// Get Interval
	public async getBillsInInterval(request: Request, response: Response): Promise<Response> {
		const { since, until } = request.params;

		const bills: Bill[] = await (await pool).query(
			`SELECT id, idClient, createdAt, total, homeDelivery FROM bill
			WHERE active = true AND DATE(createdAt) >= ? AND DATE(createdAt) <= ? AND idCompany = ?`,
			[since, until, request.user.idCompany]
		);

		return response.status(200).json(bills);
	}

	public async amountOfBillsInYear(request: Request, response: Response): Promise<Response> {
		const bills: Bill[] = await (await pool).query(
			`SELECT MONTH(createdAt) createdAt, total, homeDelivery FROM bill
			WHERE active = true AND YEAR(createdAt) = YEAR(CURDATE()) AND idCompany = ?`,
			[request.user.idCompany]
		);

		return response.status(200).json(bills);
	}

	// Get one
	public async getBill(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const bill: Bill[] = await (await pool).query(
			`SELECT id, idClient, createdAt, total, homeDelivery FROM bill
			WHERE active = true AND id = ? AND idCompany = ?`,
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
		const { idCompany } = request.user;

		const productsInBill: ProductInBill[] = await (await pool).query(
			`SELECT bhp.id, bhp.name, bhp.price, bhp.amount
			FROM billsHasProducts bhp
			INNER JOIN bill b ON bhp.idBill = b.id
			WHERE b.active = true AND b.id = ? AND b.idCompany = ?`,
			[id, idCompany]
		);

		if (productsInBill.length > 0) {
			return response.status(200).json(productsInBill);
		} else {
			return response.status(404).json({ message: 'Not found' });
		}
	}

	// Post
	public async createBill(request: Request, response: Response): Promise<Response> {
		var newBill: BillReq = request.body;
		newBill.idCompany = request.user.idCompany;

		// Validate homeDelivery
		if (typeof newBill.homeDelivery == 'undefined' || newBill.homeDelivery <= 0) {
			delete newBill.homeDelivery;
		} else if (!(await billFunctions.doesCompanyDoDeliveries(newBill.idCompany))) {
			return response.status(409).json({
				message: 'Home deliveries are disabled.'
			});
		}

		newBill.products = await billFunctions.validateProducts(
			newBill.products,
			newBill.idCompany
		);

		newBill.total = billFunctions.total(newBill);

		newBill.id = await billFunctions.createBill(newBill);

		newBill.products = await billFunctions.createProductsInBill(newBill);

		// Update amount of ingredients
		await billFunctions.updateAmountIngredients(newBill);

		return response.status(200).json({
			message: 'Saved bill.',
			id: newBill.id,
			total: newBill.total
		});
	}

	// Delete
	public async deleteBill(request: Request, response: Response): Promise<Response> {
		// Eliminar bill -> devolver los ingredientes

		return response.status(200).json({ message: 'Bill deleted.' });
	}
}

export const billsControllers = new BillsControllers();

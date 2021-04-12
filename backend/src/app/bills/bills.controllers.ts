import { Request, Response } from 'express';

// Database
import pool from '../../database';

// Models
import { Bill, BillReq, billReqToBill, ProductId, productIdtoProductInBill } from './models';
import { Product, ProductInBill } from '../products/models';

// Functions
import { billFunctions } from './bills.functions';
import { Company } from '../companies/models';

class BillsControllers {
	// Get Interval
	public async listBillsInInterval(request: Request, response: Response): Promise<Response> {
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

		const productsInBill: ProductInBill[] = await (
			await pool
		).query('SELECT * FROM billsHasProducts WHERE idBill = ? AND idCompany = ?', [
			id,
			idCompany
		]);

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
		newBill.total = 0;

		// Validate homeDelivery
		if (typeof newBill.homeDelivery == 'undefined' || newBill.homeDelivery <= 0) {
			delete newBill.homeDelivery;
		} else {
			const company: Company = (
				await (
					await pool
				).query('SELECT homeDelivery FROM company WHERE active = true AND id = ?', [
					newBill.idCompany
				])
			)[0];

			if (company.homeDelivery) {
				// Add homeDelivey to total
				newBill.total += newBill.homeDelivery;
			} else {
				return response.status(409).json({
					message: 'Home deliveries are disabled.'
				});
			}
		}

		newBill.products = billFunctions.mergeDuplicates(newBill.products);

		// Set total and Validate Products
		for (var index = 0; index < newBill.products.length; index++) {
			const product: Product = (
				await (await pool).query(
					`SELECT id, name, price FROM product
					WHERE active = true AND idCompany = ? AND id = ?`,
					[newBill.idCompany, newBill.products[index].idProduct]
				)
			)[0];

			if (typeof product == 'undefined') {
				newBill.products.splice(index);
			} else {
				// Add to total
				newBill.total += newBill.products[index].amount * product.price;

				// Save relation
				newBill.products[index].idCompany = newBill.idCompany;
				newBill.products[index].name = product.name;
				newBill.products[index].price = product.price;
			}
		}

		// Create bill
		var finalBill = billReqToBill(newBill);
		delete finalBill.active;
		delete finalBill.createdAt;

		newBill.id = (await (await pool).query('INSERT INTO bill SET ?', [finalBill])).insertId;

		// Create productsInBill
		if (newBill.id) {
			for (var product of newBill.products) {
				product.idBill = newBill.id;
				await (await pool).query('INSERT INTO billsHasProducts SET ?', [
					productIdtoProductInBill(product)
				]);
			}
		}

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

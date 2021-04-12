// Database
import pool from '../../database';

// Models
import { BillReq, billReqToBill, ProductId, productIdtoProductInBill } from './models';
import { IngredientInProduct } from '../ingredients/models';
import { Product } from '../products/models';
import { Company } from '../companies/models';

class BillFunctions {
	public async doesCompanyDoDeliveries(idCompany: number): Promise<boolean> {
		const company: Company = (
			await (
				await pool
			).query('SELECT homeDelivery FROM company WHERE active = true AND id = ?', [idCompany])
		)[0];

		return company.homeDelivery;
	}

	public async validateProducts(products: ProductId[], idCompany: number): Promise<ProductId[]> {
		var productsAux = billFunctions.mergeDuplicates(products);

		for (var index = 0; index < productsAux.length; index++) {
			const product: Product = (
				await (await pool).query(
					`SELECT id, name, price FROM product
					WHERE active = true AND idCompany = ? AND id = ?`,
					[idCompany, productsAux[index].idProduct]
				)
			)[0];

			if (typeof product == 'undefined') {
				productsAux.splice(index);
			} else {
				// Save relation
				productsAux[index].idCompany = idCompany;
				productsAux[index].name = product.name;
				productsAux[index].price = product.price;
			}
		}

		return productsAux;
	}

	public total(bill: BillReq): number {
		var total: number = 0;

		if (bill.homeDelivery) total += bill.homeDelivery;

		for (const product of bill.products) {
			total += product.amount * product.price;
		}

		return total;
	}

	public async createBill(bill: BillReq): Promise<number> {
		var finalBill = billReqToBill(bill);
		delete finalBill.active;
		delete finalBill.createdAt;

		return (await (await pool).query('INSERT INTO bill SET ?', [finalBill])).insertId;
	}

	public async createProductsInBill(bill: BillReq): Promise<ProductId[]> {
		var auxProducts = [...bill.products];

		for (var product of auxProducts) {
			if (bill.id) product.idBill = bill.id;

			product.id = (
				await (await pool).query('INSERT INTO billsHasProducts SET ?', [
					productIdtoProductInBill(product)
				])
			).insertId;
		}

		return auxProducts;
	}

	public async updateAmountIngredients(bill: BillReq): Promise<void> {
		for (const product of bill.products) {
			// Select relation
			const ingredientsInProduct: IngredientInProduct[] = await (await pool).query(
				`SELECT idIngredient FROM productsHasIngredients
				WHERE active = true AND idCompany = ? AND idProduct = ?`,
				[product.idCompany, product.idProduct]
			);

			for (const ingredientInProduct of ingredientsInProduct) {
				let idIngredient = ingredientInProduct.idIngredient;

				// Update ingredient
				await (await pool).query(
					`UPDATE ingredient ing
					INNER JOIN productsHasIngredients phi ON ing.id = phi.idIngredient
					SET ing.amount = ing.amount - (phi.spendingAmount * ?)
					WHERE ing.active = true AND ing.id = ?;`,
					[product.amount, idIngredient]
				);
			}
		}
	}

	// -- Private --

	private mergeDuplicates(products: ProductId[]): ProductId[] {
		var aux: any = {};
		var merged: ProductId[] = [];

		products.map(function (product) {
			aux[product.idProduct] = (aux[product.idProduct] || 0) + product.amount;
		});

		for (var key in aux) {
			var product: ProductId = {
				idProduct: parseInt(key),
				amount: aux[key]
			} as ProductId;

			merged.push(product);
		}

		return merged;
	}
}

export const billFunctions = new BillFunctions();

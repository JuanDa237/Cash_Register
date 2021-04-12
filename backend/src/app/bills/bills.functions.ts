// Database
import pool from '../../database';
import { Ingredient, IngredientInProduct } from '../ingredients/models';

// Models
import { BillReq, ProductId } from './models';

class BillFunctions {
	public mergeDuplicates(products: ProductId[]): ProductId[] {
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
}

export const billFunctions = new BillFunctions();

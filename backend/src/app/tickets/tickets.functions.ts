// Database
import pool from '../../database';

// Models
import { Product, ProductInTicket } from '../products/models';
import { Ingredient, IngredientInProduct } from '../ingredients/models';

interface ProductWithAmount extends Product {
	amount: number;
}

interface ProductIdWithAmount {
	idProduct: number;
	amount: number;
}

class TicketFunctions {
	public async getTotalOfTicket(
		productsIdWithAmount: ProductIdWithAmount[],
		homeDelivery?: number
	): Promise<number> {
		var total: number = 0;

		if (typeof homeDelivery != 'undefined') {
			total += homeDelivery;
		}

		for (const productIdWithAmount of productsIdWithAmount) {
			const product: Product[] = await (
				await pool
			).query('SELECT price FROM products WHERE id = ? AND active = true', [
				productIdWithAmount.idProduct
			]);
			if (product.length > 0) total += productIdWithAmount.amount * product[0].price;
		}

		return total;
	}

	public async doThingsNeededForNewTicket(
		productsIdWithAmount: ProductIdWithAmount[],
		ticketId: number,
		idCompany: number
	): Promise<void> {
		var products: ProductWithAmount[] = new Array<ProductWithAmount>(0);
		var productsInTicket: ProductInTicket[] = new Array<ProductInTicket>(0);

		for (const productIdWithAmount of productsIdWithAmount) {
			// Get products
			const product: ProductWithAmount[] = await (
				await pool
			).query(
				'SELECT id, name, price FROM products WHERE id = ? AND active = true AND idCompany = ?',
				[productIdWithAmount.idProduct, idCompany]
			);
			if (product.length <= 0) return;

			product[0].amount = productIdWithAmount.amount;
			products.push(product[0]);

			// Do the relations
			var newProductInTicket: ProductInTicket = {
				idCompany,
				idTicket: ticketId,
				name: product[0].name,
				price: product[0].price,
				amount: productIdWithAmount.amount
			};
			productsInTicket.push(newProductInTicket);
		}

		this.updateAmountIngredients(products, idCompany);
		await this.createProductsInTicket(productsInTicket);
	}

	private async createProductsInTicket(productsInTicket: ProductInTicket[]): Promise<void> {
		await productsInTicket.forEach(async (productInTicket) => {
			(await pool).query('INSERT INTO productsInTickets SET ?', [productInTicket]);
		});
	}

	private updateAmountIngredients(
		productsWithAmount: ProductWithAmount[],
		idCompany: number
	): void {
		productsWithAmount.forEach(async (productWithAmount) => {
			const ingredientsInProduct: IngredientInProduct[] = await (
				await pool
			).query(
				'SELECT idIngredient, spendingAmount FROM detailProductsIngredients WHERE idProduct = ? AND idCompany = ?',
				[productWithAmount.id, idCompany]
			);

			ingredientsInProduct.forEach(async (ingredientInProduct) => {
				let spendingAmount = ingredientInProduct.spendingAmount * productWithAmount.amount;
				let idIngredient = ingredientInProduct.idIngredient;

				const ingredient: Ingredient[] = await (
					await pool
				).query(
					'SELECT amount FROM ingredients WHERE id = ? AND active = true AND idCompany = ?',
					[idIngredient, idCompany]
				);
				let newAmount = ingredient[0].amount - spendingAmount;

				await (await pool).query('UPDATE ingredients SET amount = ? WHERE id = ?', [
					newAmount,
					idIngredient
				]);
			});
		});
	}
}

export const ticketFunctions = new TicketFunctions();

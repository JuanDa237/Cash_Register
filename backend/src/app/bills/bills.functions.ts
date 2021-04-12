// Database
import pool from '../../database';

// Models
import { Product, ProductInBill } from '../products/models';
import { Ingredient, IngredientInProduct } from '../ingredients/models';
import { Bill } from './models';

interface ProductWithAmount extends Product {
	amount: number;
}

interface ProductIdWithAmount {
	idProduct: number;
	amount: number;
}

class BillFunctions {
	public async getTotalOfBill(products: ProductIdWithAmount[], bill: Bill): Promise<number> {
		var total: number = 0;

		if (typeof bill.homeDelivery != 'undefined') total += bill.homeDelivery;

		for (const productId of products) {
			const product: Product = (
				await (
					await pool
				).query(
					'SELECT price FROM product WHERE active = true AND idCompany = ? AND id = ?',
					[bill.idCompany, productId.idProduct]
				)
			)[0];

			if (typeof product != 'undefined') {
				total += productId.amount * product.price;
			}
		}

		return total;
	}

	public async doThingsNeededForNewBill(
		productsIdWithAmount: ProductIdWithAmount[],
		billId: number,
		idCompany: number
	): Promise<void> {
		var products: ProductWithAmount[] = new Array<ProductWithAmount>(0);
		var productsInBill: ProductInBill[] = new Array<ProductInBill>(0);

		for (const productIdWithAmount of productsIdWithAmount) {
			// Get products
			const product: ProductWithAmount[] = await (
				await pool
			).query(
				'SELECT id, name, price FROM product WHERE id = ? AND active = true AND idCompany = ?',
				[productIdWithAmount.idProduct, idCompany]
			);
			if (product.length <= 0) return;

			product[0].amount = productIdWithAmount.amount;
			products.push(product[0]);

			// Do the relations
			var newProductInBill: ProductInBill = {
				idCompany,
				idBill: billId,
				name: product[0].name,
				price: product[0].price,
				amount: productIdWithAmount.amount
			};
			productsInBill.push(newProductInBill);
		}

		this.updateAmountIngredients(products, idCompany);
		await this.createProductsInBill(productsInBill);
	}

	private async createProductsInBill(productsInBill: ProductInBill[]): Promise<void> {
		await productsInBill.forEach(async (productInBill) => {
			await (await pool).query('INSERT INTO billsHasProducts SET ?', [productInBill]);
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
				'SELECT idIngredient, spendingAmount FROM productsHasIngredients WHERE idProduct = ? AND idCompany = ?',
				[productWithAmount.id, idCompany]
			);

			ingredientsInProduct.forEach(async (ingredientInProduct) => {
				let spendingAmount = ingredientInProduct.spendingAmount * productWithAmount.amount;
				let idIngredient = ingredientInProduct.idIngredient;

				const ingredient: Ingredient[] = await (
					await pool
				).query(
					'SELECT amount FROM ingredient WHERE id = ? AND active = true AND idCompany = ?',
					[idIngredient, idCompany]
				);
				let newAmount = ingredient[0].amount - spendingAmount;

				await (await pool).query('UPDATE ingredient SET amount = ? WHERE id = ?', [
					newAmount,
					idIngredient
				]);
			});
		});
	}
}

export const billFunctions = new BillFunctions();

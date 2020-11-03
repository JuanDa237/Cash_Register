// Database
import pool from '../../database';

// Models
import { Product } from '../products/models';
import { IngredientInProduct } from '../ingredients/models';
import { ingredientsControllers } from '../ingredients/ingredients.controllers';

interface ProductWithIngredients extends Product {
	ingredients: IngredientInProduct[];
}

class ProductsFunctions {
	public async createProduct(body: ProductWithIngredients, idCompany: number): Promise<number> {
		const product: Product = {
			idCompany,
			idCategory: body.idCategory,
			name: body.name,
			price: body.price
		};

		const newProduct: any = await (await pool).query('INSERT INTO products SET ?', [product]);

		var ingredientsInProduct: IngredientInProduct[] = body.ingredients;

		await ingredientsInProduct.forEach(async (ingredientInProduct) => {
			if (ingredientInProduct.spendingAmount > 0) {
				ingredientInProduct.idCompany = idCompany;
				ingredientInProduct.idProduct = newProduct.insertId;

				(await pool).query('INSERT INTO detailProductsIngredients SET ?', [
					ingredientInProduct
				]);
			}
		});

		return newProduct.insertId;
	}

	public async updateProduct(
		idProduct: number,
		body: ProductWithIngredients,
		idCompany: number
	): Promise<void> {
		const product: Product = {
			idCompany,
			idCategory: body.idCategory,
			name: body.name,
			price: body.price
		};

		(await pool).query('UPDATE products SET ? WHERE id = ?', [product, idProduct]);

		const newIngredients: IngredientInProduct[] = body.ingredients;

		newIngredients.forEach((ingredient) => {
			ingredient.idCompany = idCompany;
			ingredient.idProduct = idProduct;
		});

		const actualIngredients: IngredientInProduct[] = await (
			await pool
		).query(
			'SELECT id, idProduct, idIngredient, spendingAmount FROM detailProductsIngredients WHERE idProduct = ? AND active = true AND idCompany = ?',
			[idProduct, idCompany]
		);

		for (const actualIngredient of actualIngredients) {
			const index = newIngredients.findIndex(
				(ingredient) => ingredient.idIngredient == actualIngredient.idIngredient
			);

			if (index < 0) {
				// Delete
				(
					await pool
				).query('UPDATE detailProductsIngredients SET active = false WHERE id = ?', [
					actualIngredient.id
				]);
			} else {
				if (newIngredients[index].spendingAmount > 0) {
					// Update
					(await pool).query('UPDATE detailProductsIngredients SET ? WHERE id = ?', [
						newIngredients[index],
						actualIngredient.id
					]);
				}
				newIngredients.splice(index, 1);
			}
		}

		for (const newIngredient of newIngredients) {
			// Create
			if (newIngredient.spendingAmount > 0) {
				(await pool).query('INSERT INTO detailProductsIngredients SET ?', [newIngredient]);
			}
		}
	}
}

export const productsFunctions = new ProductsFunctions();

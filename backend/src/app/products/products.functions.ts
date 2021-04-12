// Database
import pool from '../../database';

// Models
import { Product } from '../products/models';
import { Ingredient, IngredientInProduct } from '../ingredients/models';
import { Category } from '../categories/models';

interface ProductWithIngredients extends Product {
	ingredients: IngredientInProduct[];
}

class ProductsFunctions {
	public async verifyIngredients(
		ingredients: IngredientInProduct[],
		idCompany: number
	): Promise<boolean> {
		var ingredientsValid: boolean = true;

		for (let i = 0; i < ingredients.length; i++) {
			const ingredient = ingredients[i];

			const foundIngredient: Ingredient[] = await (
				await pool
			).query('SELECT name FROM ingredients WHERE id = ? AND idCompany = ?', [
				ingredient.idIngredient,
				idCompany
			]);

			if (typeof foundIngredient == 'undefined' || typeof foundIngredient[0] == 'undefined') {
				ingredientsValid = false;
			}
		}

		return ingredientsValid;
	}

	public async validCategory(idCategory: number, idCompany: number): Promise<boolean> {
		const category: Category[] = await (
			await pool
		).query('SELECT name FROM category WHERE id = ? AND idCompany = ?', [
			idCategory,
			idCompany
		]);

		return typeof category == 'undefined' || typeof category[0] != 'undefined';
	}

	public async hisProduct(idProduct: number, idCompany: number): Promise<boolean> {
		const oldProduct: Product[] = await (
			await pool
		).query('SELECT name FROM products WHERE id = ? AND idCompany = ?', [idProduct, idCompany]);

		return typeof oldProduct[0] != 'undefined';
	}

	public async createProduct(body: any, idCompany: number, image: string): Promise<number> {
		const product: Product = {
			idCompany,
			idCategory: Number(body.idCategory),
			name: body.name,
			price: Number(body.price),
			description: body.description,
			image
		};

		const newProduct: any = await (await pool).query('INSERT INTO products SET ?', [product]);

		var ingredientsInProduct: IngredientInProduct[] = JSON.parse(body.ingredients);

		await ingredientsInProduct.forEach(async (ingredientInProduct) => {
			if (ingredientInProduct.spendingAmount > 0) {
				ingredientInProduct.idCompany = idCompany;
				ingredientInProduct.idProduct = newProduct.insertId;

				await (await pool).query('INSERT INTO detailProductsIngredients SET ?', [
					ingredientInProduct
				]);
			}
		});

		return newProduct.insertId;
	}

	public async updateProduct(
		idProduct: number,
		body: any,
		idCompany: number,
		image: string
	): Promise<void> {
		const product: Product = {
			idCompany,
			idCategory: body.idCategory,
			name: body.name,
			price: body.price,
			description: body.description,
			image
		};

		(await pool).query('UPDATE products SET ? WHERE id = ?', [product, idProduct]);

		const newIngredients: IngredientInProduct[] = JSON.parse(body.ingredients);

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

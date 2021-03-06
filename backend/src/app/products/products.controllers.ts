import { Request, Response } from 'express';
import fs from 'fs-extra';
import path from 'path';

// Database
import pool from '../../database';

// Models
import { Product } from './models';
import { IngredientInProduct } from '../ingredients/models';

// Functions
import { productsFunctions } from './products.functions';

class ProductsController {
	// Get list
	public async listProducts(request: Request, response: Response): Promise<Response> {
		const products: Product[] = await (await pool).query(
			`SELECT id, name, price, description, image FROM product
			WHERE active = true AND idCompany = ?`,
			[request.user.idCompany]
		);

		return response.status(200).json(products);
	}

	// Get one
	public async getProduct(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const product: Product[] = await (
			await pool
		).query(
			'SELECT id, idCategory , name, price, description, image FROM product WHERE id = ? AND active = true AND idCompany = ?',
			[id, request.user.idCompany]
		);

		if (product.length > 0) {
			return response.status(200).json(product[0]);
		} else {
			return response.status(404).json({ message: 'Not found' });
		}
	}

	public async getIngredientsInProduct(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const ingredientsInProduct: IngredientInProduct[] = await (
			await pool
		).query(
			'SELECT id, idProduct, idIngredient, spendingAmount FROM productsHasIngredients WHERE idProduct = ? AND active = true AND idCompany = ?',
			[id, request.user.idCompany]
		);

		return response.status(200).json(ingredientsInProduct);
	}

	// Post

	public async createProduct(request: Request, response: Response): Promise<Response> {
		const image = (request.file as unknown) as {
			[fieldname: string]: Express.Multer.File;
		};
		const idCompany: number = request.user.idCompany;

		const imagePath: string = String(typeof image != 'undefined' ? image.path : '');

		// Verify category
		if (await productsFunctions.validCategory(request.body.idCategory, idCompany)) {
			// Verify ingredients
			if (
				await productsFunctions.verifyIngredients(
					JSON.parse(request.body.ingredients),
					idCompany
				)
			) {
				const idProduct = await productsFunctions.createProduct(
					request.body,
					idCompany,
					imagePath
				);

				return response.status(200).json({
					message: 'Saved product.',
					id: idProduct
				});
			} else {
				return response.status(400).json({ message: 'Invalid ingredients.' });
			}
		} else {
			return response.status(400).json({ message: 'Invalid category.' });
		}
	}

	// Update

	public async updateProduct(request: Request, response: Response): Promise<Response> {
		const idProduct = Number(request.params.id);
		const idCompany = request.user.idCompany;
		const image = (request.file as unknown) as {
			[fieldname: string]: Express.Multer.File;
		};

		// Check if it is his product.
		if (await productsFunctions.hisProduct(idProduct, idCompany)) {
			// Verify category
			if (await productsFunctions.validCategory(request.body.idCategory, idCompany)) {
				// Verify ingredients
				if (
					await productsFunctions.verifyIngredients(
						JSON.parse(request.body.ingredients),
						idCompany
					)
				) {
					// Delete image
					const oldProduct: Product[] = await (
						await pool
					).query('SELECT image FROM product WHERE id = ?', [idProduct]);
					const imagePath: string = String(
						typeof image != 'undefined' ? image.path : oldProduct[0].image
					);

					if (typeof image != 'undefined' && oldProduct[0].image != '') {
						try {
							await fs.unlink(path.resolve(oldProduct[0].image));
						} catch (error) {}
					}

					// Update
					await productsFunctions.updateProduct(
						idProduct,
						request.body,
						idCompany,
						imagePath
					);

					return response
						.status(200)
						.json({ message: 'Product and ingredients updated successfully.' });
				} else {
					return response.status(401).json({ message: 'No valid ingredients.' });
				}
			} else {
				return response.status(401).json({ message: 'No found category.' });
			}
		} else {
			return response.status(404).json({ message: 'Not found product.' });
		}
	}

	// Delete

	public async deleteProduct(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const oldProduct: Product[] = await (
			await pool
		).query('SELECT image FROM product WHERE id = ? AND idCompany = ?', [
			id,
			request.user.idCompany
		]);

		if (typeof oldProduct != 'undefined' && typeof oldProduct[0] != 'undefined') {
			// Delete image
			if (oldProduct[0].image != '') {
				try {
					await fs.unlink(path.resolve(oldProduct[0].image));
				} catch (error) {}
			}

			await (await pool).query('UPDATE product SET active = false, image = "" WHERE id = ?', [
				id
			]);

			return response.status(200).json({ message: 'Product deleted successfully.' });
		} else {
			return response.status(400).json({ message: 'Product not found.' });
		}
	}
}

export const productsController = new ProductsController();

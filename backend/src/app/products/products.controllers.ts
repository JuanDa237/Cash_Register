import { Request, Response } from 'express';

// Database
import pool from '../../database';

// Models
import { Product } from './models';
import { IngredientInProduct } from '../ingredients/models';

class ProductsController {
	//Get All List
	public async listAllProducts(request: Request, response: Response): Promise<Response> {
		const products: Product[] = await (
			await pool
		).query('SELECT id, name, price FROM products WHERE idCompany = ?', [
			request.user.idCompany
		]);

		return response.status(200).json(products);
	}

	//Get list

	public async listProducts(request: Request, response: Response): Promise<Response> {
		const products: Product[] = await (
			await pool
		).query('SELECT id, name, price FROM products WHERE active = true AND idCompany = ?', [
			request.user.idCompany
		]);

		return response.status(200).json(products);
	}

	public async listIngredientsInProducts(
		request: Request,
		response: Response
	): Promise<Response> {
		const ingredientsInProduct: IngredientInProduct[] = await (
			await pool
		).query(
			'SELECT id, idProduct, idIngredient, spendingAmount FROM detailProductsIngredients WHERE active = true AND idCompany = ?',
			[request.user.idCompany]
		);

		return response.status(200).json(ingredientsInProduct);
	}

	//Get one
	public async getOneProduct(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const product: Product[] = await (
			await pool
		).query(
			'SELECT id, idCategory , name, price FROM products WHERE id = ? AND active = true AND idCompany = ?',
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
			'SELECT id, idProduct, idIngredient, spendingAmount FROM detailProductsIngredients WHERE idProduct = ? AND active = true AND idCompany = ?',
			[id, request.user.idCompany]
		);

		return response.status(200).json(ingredientsInProduct);
	}

	//Post

	public async createProduct(request: Request, response: Response): Promise<Response> {
		request.body.idCompany = request.user.idCompany;

		const newProduct: any = await (await pool).query('INSERT INTO products SET ?', [
			request.body
		]);

		return response.status(200).json({
			message: 'Saved product.',
			id: newProduct.insertId
		});
	}

	public async createIngredientInProduct(
		request: Request,
		response: Response
	): Promise<Response> {
		request.body.idCompany = request.user.idCompany;
		const newIngredientInProduct: any = await (
			await pool
		).query('INSERT INTO detailProductsIngredients SET ?', [request.body]);

		return response.status(200).json({
			message: 'Saved ingredient in product.',
			id: newIngredientInProduct.insertId
		});
	}

	//Update

	public async updateProduct(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		await (await pool).query('UPDATE products SET ? WHERE id = ?', [request.body, id]);

		return response.status(200).json({ message: 'Product updated successfully.' });
	}

	public async updateIngredientInProduct(
		request: Request,
		response: Response
	): Promise<Response> {
		const { id } = request.params;
		await (await pool).query('UPDATE detailProductsIngredients SET ? WHERE id = ?', [
			request.body,
			id
		]);

		return response
			.status(200)
			.json({ message: 'Ingredient in product updated successfully.' });
	}

	//Delete

	public async deleteProduct(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		await (await pool).query('UPDATE products SET active = false WHERE id = ?', [id]);

		return response.status(200).json({ message: 'Product eliminated successfully.' });
	}

	public async deleteIngredientInProduct(
		request: Request,
		response: Response
	): Promise<Response> {
		const { id } = request.params;
		await (await pool).query(
			'UPDATE detailProductsIngredients SET active = false WHERE id = ?',
			[id]
		);

		return response
			.status(200)
			.json({ message: 'Ingredient in product eliminated successfully.' });
	}
}

export const productsController = new ProductsController();

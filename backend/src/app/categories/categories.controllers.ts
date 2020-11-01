import { Request, Response } from 'express';

// Database
import pool from '../../database';

// Models
import { Category } from './models';
import { Product } from '../products/models';

class CategoriesControllers {
	//Get List
	public async listCategories(request: Request, response: Response): Promise<Response> {
		const categories: Category[] = await (
			await pool
		).query('SELECT id, name FROM categories WHERE active = true AND idCompany = ?', [
			request.user.idCompany
		]);
		return response.status(200).json(categories);
	}

	//Get One
	public async getOneCategory(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const category: Category[] = await (
			await pool
		).query(
			'SELECT id, name FROM categories WHERE id = ? AND active = true AND idCompany = ?;',
			[id, request.user.idCompany]
		);

		return response.status(200).json(category[0]);
	}

	//Post
	public async createCategory(request: Request, response: Response): Promise<Response> {
		request.body.idCompany = request.user.idCompany;
		const newCategory: any = await (await pool).query('INSERT INTO categories SET ?', [
			request.body
		]);

		return response.status(200).json({
			message: 'Saved category.',
			id: newCategory.insertId
		});
	}

	//Update
	public async updateCategory(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		await (await pool).query('UPDATE categories SET ? WHERE id = ?', [request.body, id]);
		return response.status(200).json({ message: 'Category updated successfully.' });
	}

	//Delete
	public async deleteCategory(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		(await pool).query('UPDATE categories SET active = false WHERE id = ?', [id]);

		const productsInCategory: Product[] = await (
			await pool
		).query('SELECT id FROM products WHERE idCategory = ? AND active = true', [id]);

		productsInCategory.forEach(async (product) => {
			(await pool).query('UPDATE products SET active = false WHERE id = ?', [product.id]);
		});

		return response.status(200).json({ message: 'Category eliminated successfully.' });
	}
}

export const categoriesControllers = new CategoriesControllers();

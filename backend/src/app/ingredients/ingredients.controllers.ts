import { Request, Response } from 'express';

// Database
import pool from '../../database';

// Models
import { Ingredient, IngredientInProduct } from './models';

class IngredientsControllers {
	// Get list
	public async listIngredients(request: Request, response: Response): Promise<Response> {
		const ingredients: Ingredient[] = await (
			await pool
		).query(
			'SELECT id, name, amount, priceByUnit FROM ingredients WHERE active = true AND idCompany = ?',
			[request.user.idCompany]
		);
		return response.status(200).json(ingredients);
	}

	// Get one
	public async getOneIngredient(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const ingredient: Ingredient[] = await (
			await pool
		).query(
			'SELECT id, name, amount, priceByUnit FROM ingredients WHERE id = ? AND active = true AND idCompany = ?',
			[id, request.user.idCompany]
		);

		if (ingredient.length > 0) {
			return response.status(200).json(ingredient[0]);
		} else {
			return response.status(404).json({ message: 'Not found' });
		}
	}

	// Post
	public async createIngredient(request: Request, response: Response): Promise<Response> {
		request.body.idCompany = request.user.idCompany;
		const newIngredient: any = await (await pool).query('INSERT INTO ingredients SET ?', [
			request.body
		]);

		return response.status(200).json({
			message: 'Saved ingredient.',
			id: newIngredient.insertId
		});
	}

	// Update
	public async updateIngredient(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		await (await pool).query('UPDATE ingredients SET ? WHERE id = ?', [request.body, id]);
		return response.status(200).json({ message: 'Ingredient updated successfully.' });
	}

	// Delete
	public async deleteIngredient(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		await (await pool).query('UPDATE ingredients SET active = false WHERE id = ?', [id]);
		return response.status(200).json({ message: 'Ingredient eliminated successfully.' });
	}
}

export const ingredientsControllers = new IngredientsControllers();

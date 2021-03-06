import { Request, Response } from 'express';

// Database
import pool from '../../database';

// Models
import { Ingredient } from './models';

class IngredientsControllers {
	// Get list
	public async listIngredients(request: Request, response: Response): Promise<Response> {
		const ingredients: Ingredient[] = await (await pool).query(
			`SELECT id, name, amount, priceByUnit FROM ingredient
			WHERE active = true AND idCompany = ?`,
			[request.user.idCompany]
		);
		return response.status(200).json(ingredients);
	}

	// Get one
	public async getIngredient(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const ingredient: Ingredient[] = await (await pool).query(
			`SELECT id, name, amount, priceByUnit FROM ingredient
			WHERE active = true AND id = ? AND idCompany = ?`,
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
		const newIngredient: any = await (await pool).query('INSERT INTO ingredient SET ?', [
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

		const status: any = await (
			await pool
		).query('UPDATE ingredient SET ? WHERE id = ? AND idCompany = ?', [
			request.body,
			id,
			request.user.idCompany
		]);

		if (status.affectedRows > 0) {
			return response.status(200).json({ message: 'Ingredient updated successfully.' });
		} else {
			return response.status(404).json({ message: 'Ingredient not found.' });
		}
	}

	// Delete
	public async deleteIngredient(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const status: any = await (
			await pool
		).query('UPDATE ingredient SET active = false WHERE id = ? AND idCompany = ?', [
			id,
			request.user.idCompany
		]);

		if (status.affectedRows > 0) {
			return response.status(200).json({ message: 'Ingredient deleted successfully.' });
		} else {
			return response.status(404).json({ message: 'Ingredient not found.' });
		}
	}
}

export const ingredientsControllers = new IngredientsControllers();

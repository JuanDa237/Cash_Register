import { Router } from 'express';

import { ingredientsControllers } from './ingredients.controllers';
import { authJwt } from '../auth/middlewares/index';

class IngredientsRoutes {
	constructor(public router: Router = Router()) {
		this.routes();
	}

	routes(): void {
		// Get list
		this.router.get(
			'/ingredients',
			[authJwt.isAdministrator],
			ingredientsControllers.listIngredients
		);

		// Get one
		this.router.get(
			'/ingredient/:id',
			[authJwt.isAdministrator],
			ingredientsControllers.getIngredient
		);

		// Post
		this.router.post(
			'/ingredient',
			[authJwt.isAdministrator],
			ingredientsControllers.createIngredient
		);

		// Update
		this.router.put(
			'/ingredient/:id',
			[authJwt.isAdministrator],
			ingredientsControllers.updateIngredient
		);

		// Delete
		this.router.delete(
			'/ingredient/:id',
			[authJwt.isAdministrator],
			ingredientsControllers.deleteIngredient
		);
	}
}

const ingredientsRoutes = new IngredientsRoutes();
export default ingredientsRoutes.router;

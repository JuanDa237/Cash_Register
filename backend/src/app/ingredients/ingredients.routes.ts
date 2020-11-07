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
			[authJwt.verifyToken, authJwt.isCashier],
			ingredientsControllers.listIngredients
		);

		// Get one
		this.router.get(
			'/ingredient/:id',
			[authJwt.verifyToken, authJwt.isCashier],
			ingredientsControllers.getOneIngredient
		);

		// Post
		this.router.post(
			'/ingredient',
			[authJwt.verifyToken, authJwt.isAdministrator],
			ingredientsControllers.createIngredient
		);

		// Update
		this.router.put(
			'/ingredient/:id',
			[authJwt.verifyToken, authJwt.isAdministrator],
			ingredientsControllers.updateIngredient
		);

		// Delete
		this.router.delete(
			'/ingredient/:id',
			[authJwt.verifyToken, authJwt.isAdministrator],
			ingredientsControllers.deleteIngredient
		);
	}
}

const ingredientsRoutes = new IngredientsRoutes();
export default ingredientsRoutes.router;

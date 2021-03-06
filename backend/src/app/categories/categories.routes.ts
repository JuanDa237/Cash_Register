import { Router } from 'express';

import { categoriesControllers } from './categories.controllers';
import { authJwt } from '../auth/middlewares/index';

class CategoriesRoutes {
	constructor(public router: Router = Router()) {
		this.routes();
	}

	routes(): void {
		// Get list
		this.router.get(
			'/categories',
			[authJwt.isAdministrator],
			categoriesControllers.listCategories
		);

		// Get one
		this.router.get(
			'/category/:id',
			[authJwt.isAdministrator],
			categoriesControllers.getCategory
		);

		// Post
		this.router.post(
			'/category',
			[authJwt.isAdministrator],
			categoriesControllers.createCategory
		);

		// Update
		this.router.put(
			'/category/:id',
			[authJwt.isAdministrator],
			categoriesControllers.updateCategory
		);

		// Delete
		this.router.delete(
			'/category/:id',
			[authJwt.isAdministrator],
			categoriesControllers.deleteCategory
		);
	}
}

const categoriesRoutes = new CategoriesRoutes();
export default categoriesRoutes.router;

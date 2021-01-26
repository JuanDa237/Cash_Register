import { Router } from 'express';

import { usersController } from './users.controllers';
import { authJwt } from '../auth/middlewares/index';

class ProductsRoutes {
	constructor(public router: Router = Router()) {
		this.routes();
	}

	routes(): void {
		// Get One
		this.router.get('/user', [authJwt.isCashier], usersController.getUser);
		this.router.get('/all/user', [authJwt.isCashier], usersController.getUserAndCompany);
		this.router.get('/user/company', [authJwt.isCashier], usersController.getCompany);

		// Get List
		this.router.get('/users/admins', [authJwt.isSuperAdmin], usersController.getAdmins);
		this.router.get('/users/cashiers', [authJwt.isAdministrator], usersController.getCashiers);
	}
}

const usersRoutes = new ProductsRoutes();
export default usersRoutes.router;

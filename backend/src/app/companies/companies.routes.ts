import { Router } from 'express';

import { companiesControllers } from './companies.controllers';
import { authJwt } from '../auth/middlewares';
import { multerConfig } from './middlewares';

class CompaniesRoutes {
	constructor(public router: Router = Router()) {
		this.routes();
	}

	routes(): void {
		// Get one
		this.router.get(
			'/company',
			[authJwt.verifyToken, authJwt.isCashier],
			companiesControllers.getOneCompany
		);

		// Post
		this.router.post(
			'/company',
			[authJwt.verifyToken, authJwt.isSuperAdmin, multerConfig.single('image')],
			companiesControllers.createCompany
		);

		// Update
		this.router.post(
			'/company/:id',
			[authJwt.verifyToken, authJwt.isSuperAdmin, multerConfig.single('image')],
			companiesControllers.updateCompany
		);
	}
}

const companiesRoutes = new CompaniesRoutes();
export default companiesRoutes.router;

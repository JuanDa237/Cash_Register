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
			companiesControllers.getCompany
		);

		this.router.get('/company/:id', companiesControllers.getCompanyById);

		// Post
		this.router.post(
			'/company',
			[authJwt.verifyToken, authJwt.isSuperAdmin, multerConfig.single('image')],
			companiesControllers.createCompany
		);

		// Update
		this.router.put(
			'/company',
			[authJwt.verifyToken, authJwt.isAdministrator, multerConfig.single('image')],
			companiesControllers.updateCompany
		);
	}
}

const companiesRoutes = new CompaniesRoutes();
export default companiesRoutes.router;

import { Router } from 'express';

import { companiesControllers } from './companies.controllers';
import { authenticationJwt } from '../authentication/middlewares';
import { multerConfig } from './middlewares';

class CompaniesRoutes {
	constructor(public router: Router = Router()) {
		this.routes();
	}

	routes(): void {
		// Get one
		this.router.get(
			'/company',
			[authenticationJwt.verifyToken, authenticationJwt.isCashier],
			companiesControllers.getOneCompany
		);

		// Post
		this.router.post(
			'/company',
			[
				authenticationJwt.verifyToken,
				authenticationJwt.isSuperAdmin,
				multerConfig.single('image')
			],
			companiesControllers.createCompany
		);

		// Update
		this.router.post(
			'/company/:id',
			[
				authenticationJwt.verifyToken,
				authenticationJwt.isSuperAdmin,
				multerConfig.single('image')
			],
			companiesControllers.updateCompany
		);
	}
}

const companiesRoutes = new CompaniesRoutes();
export default companiesRoutes.router;

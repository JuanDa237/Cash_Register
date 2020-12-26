import { Router } from 'express';

import { companiesControllers } from './companies.controllers';
import { authJwt } from '../auth/middlewares';
import { multerConfig } from './middlewares';

class CompaniesRoutes {
	constructor(public router: Router = Router()) {
		this.routes();
	}

	routes(): void {
		// Get
		this.router.get('/companies', companiesControllers.getCompanies);
		this.router.get(
			'/all/companies',
			[authJwt.isSuperAdmin],
			companiesControllers.getAllCompanies
		);

		// Get one
		this.router.get('/my/company', [authJwt.isCashier], companiesControllers.getCompany);

		this.router.get('/company/:id', companiesControllers.getCompanyById);

		// Post
		this.router.post(
			'/company',
			[authJwt.isSuperAdmin, multerConfig.single('image')],
			companiesControllers.createCompany
		);

		// Update
		this.router.put(
			'/company/:id',
			[authJwt.isSuperAdmin, multerConfig.single('image')],
			companiesControllers.updateCompany
		);

		this.router.put(
			'/my/company',
			[authJwt.isAdministrator, multerConfig.single('image')],
			companiesControllers.updateCompany
		);
	}
}

const companiesRoutes = new CompaniesRoutes();
export default companiesRoutes.router;

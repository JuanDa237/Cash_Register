import { Router } from 'express';

import { companiesControllers } from './companies.controllers';
import { authJwt } from '../auth/middlewares';
import { multerConfigCompanies } from './middlewares';

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
		this.router.get('/company/:id', companiesControllers.getCompanyById);
		this.router.get(
			'/all/company/:id',
			[authJwt.isSuperAdmin],
			companiesControllers.companyByIdAsSuper
		);

		// Post
		this.router.post(
			'/company',
			[authJwt.isSuperAdmin, multerConfigCompanies.single('image')],
			companiesControllers.createCompany
		);

		// Update
		this.router.put(
			'/company/:id',
			[authJwt.isSuperAdmin, multerConfigCompanies.single('image')],
			companiesControllers.updateCompany
		);

		this.router.put(
			'/my/company',
			[authJwt.isAdministrator, multerConfigCompanies.single('image')],
			companiesControllers.updateCompany
		);

		// Delete
		this.router.delete(
			'/company/:id',
			[authJwt.isSuperAdmin],
			companiesControllers.deleteCompany
		);
	}
}

const companiesRoutes = new CompaniesRoutes();
export default companiesRoutes.router;

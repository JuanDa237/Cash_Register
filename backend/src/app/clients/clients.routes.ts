import { Router } from 'express';

import { clientsControllers } from './clients.controllers';
import { authJwt } from '../auth/middlewares/index';

class CategoriesRoutes {
	constructor(public router: Router = Router()) {
		this.routes();
	}

	routes(): void {
		// Get Interval
		this.router.get(
			'/clients/year',
			[authJwt.isAdministrator],
			clientsControllers.listClientsInYear
		);

		// Get All List
		this.router.get(
			'/all/clients',
			[authJwt.isAdministrator],
			clientsControllers.listAllClients
		);

		// Get list
		this.router.get('/clients', [authJwt.isCashier], clientsControllers.listClients);

		// Get one
		this.router.get('/client/:id', [authJwt.isCashier], clientsControllers.getClient);

		// Post
		this.router.post('/client', [authJwt.isCashier], clientsControllers.createClient);

		// Update
		this.router.put('/client/:id', [authJwt.isAdministrator], clientsControllers.updateClient);

		// Delete
		this.router.delete(
			'/client/:id',
			[authJwt.isAdministrator],
			clientsControllers.deleteClient
		);
	}
}

const categoriesRoutes = new CategoriesRoutes();
export default categoriesRoutes.router;

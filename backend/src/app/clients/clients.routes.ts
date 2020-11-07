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
			[authJwt.verifyToken, authJwt.isAdministrator],
			clientsControllers.listClientsInYear
		);

		// Get All List
		this.router.get(
			'/all/clients',
			[authJwt.verifyToken, authJwt.isAdministrator],
			clientsControllers.listAllClients
		);

		// Get list
		this.router.get(
			'/clients',
			[authJwt.verifyToken, authJwt.isCashier],
			clientsControllers.listClients
		);

		// Get one
		this.router.get(
			'/client/:id',
			[authJwt.verifyToken, authJwt.isCashier],
			clientsControllers.getOneClient
		);

		// Post
		this.router.post(
			'/client',
			[authJwt.verifyToken, authJwt.isAdministrator],
			clientsControllers.createClient
		);

		// Update
		this.router.put(
			'/client/:id',
			[authJwt.verifyToken, authJwt.isAdministrator],
			clientsControllers.updateClient
		);

		// Delete
		this.router.delete(
			'/client/:id',
			[authJwt.verifyToken, authJwt.isAdministrator],
			clientsControllers.deleteClient
		);
	}
}

const categoriesRoutes = new CategoriesRoutes();
export default categoriesRoutes.router;

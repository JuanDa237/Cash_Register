import { Router } from 'express';

import { clientsControllers } from './clients.controllers';
import { authenticationJwt } from '../authentication/middlewares/index';

class CategoriesRoutes {
	constructor(public router: Router = Router()) {
		this.routes();
	}

	routes(): void {
		// Get Interval
		this.router.get(
			'/clients/year',
			[authenticationJwt.verifyToken, authenticationJwt.isAdministrator],
			clientsControllers.listClientsInYear
		);

		// Get All List
		this.router.get(
			'/all/clients',
			[authenticationJwt.verifyToken, authenticationJwt.isAdministrator],
			clientsControllers.listAllClients
		);

		// Get list
		this.router.get(
			'/clients',
			[authenticationJwt.verifyToken, authenticationJwt.isCashier],
			clientsControllers.listClients
		);

		// Get one
		this.router.get(
			'/client/:id',
			[authenticationJwt.verifyToken, authenticationJwt.isCashier],
			clientsControllers.getOneClient
		);

		// Post
		this.router.post(
			'/client',
			[authenticationJwt.verifyToken, authenticationJwt.isAdministrator],
			clientsControllers.createClient
		);

		// Update
		this.router.put(
			'/client/:id',
			[authenticationJwt.verifyToken, authenticationJwt.isAdministrator],
			clientsControllers.updateClient
		);

		// Delete
		this.router.delete(
			'/client/:id',
			[authenticationJwt.verifyToken, authenticationJwt.isAdministrator],
			clientsControllers.deleteClient
		);
	}
}

const categoriesRoutes = new CategoriesRoutes();
export default categoriesRoutes.router;

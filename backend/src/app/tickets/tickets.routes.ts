import { Router } from 'express';

import { ticketsControllers } from './tickets.controllers';
import { authJwt } from '../auth/middlewares/index';

class CategoriesRoutes {
	constructor(public router: Router = Router()) {
		this.routes();
	}

	routes(): void {
		// Get Interval
		this.router.get(
			'/tickets/:since/:until',
			[authJwt.isAdministrator],
			ticketsControllers.listTicketsInInterval
		);
		this.router.get(
			'/tickets/year',
			[authJwt.isAdministrator],
			ticketsControllers.listTicketsInYear
		);

		// Get list
		this.router.get('/tickets', [authJwt.isAdministrator], ticketsControllers.listTickets);
		this.router.get(
			'/tickets/products',
			[authJwt.isAdministrator],
			ticketsControllers.listProductsInTickets
		);
		this.router.get(
			'/ticket/products/:id',
			[authJwt.isAdministrator],
			ticketsControllers.getProductsInTicket
		);

		// Get one
		this.router.get('/ticket/:id', [authJwt.isAdministrator], ticketsControllers.getOneTicket);

		// Post
		this.router.post('/ticket', [authJwt.isCashier], ticketsControllers.createTicket);
	}
}

const categoriesRoutes = new CategoriesRoutes();
export default categoriesRoutes.router;

import { Router } from 'express';

import { billsControllers } from './bills.controllers';
import { authJwt } from '../auth/middlewares/index';

class BillsRoutes {
	constructor(public router: Router = Router()) {
		this.routes();
	}

	routes(): void {
		// Get Interval
		this.router.get(
			'/bills/:since/:until',
			[authJwt.isAdministrator],
			billsControllers.getBillsInInterval
		);
		this.router.get(
			'/bills/year',
			[authJwt.isAdministrator],
			billsControllers.amountOfBillsInYear
		);

		// Get list
		this.router.get(
			'/bill/products/:id',
			[authJwt.isAdministrator],
			billsControllers.getProductsInBill
		);

		// Get one
		this.router.get('/bill/:id', [authJwt.isAdministrator], billsControllers.getBill);

		// Post
		this.router.post('/bill', [authJwt.isCashier], billsControllers.createBill);

		// Delete
		this.router.delete('/bill/:id', [authJwt.isAdministrator], billsControllers.deleteBill);
	}
}

const billsRoutes = new BillsRoutes();
export default billsRoutes.router;

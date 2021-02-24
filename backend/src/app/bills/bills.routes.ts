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
			billsControllers.listBillsInInterval
		);
		this.router.get('/bills/year', [authJwt.isAdministrator], billsControllers.listBillsInYear);

		// Get list
		this.router.get('/bills', [authJwt.isAdministrator], billsControllers.listBills);
		this.router.get(
			'/bills/products',
			[authJwt.isAdministrator],
			billsControllers.listProductsInBills
		);
		this.router.get(
			'/bill/products/:id',
			[authJwt.isAdministrator],
			billsControllers.getProductsInBill
		);

		// Get one
		this.router.get('/bill/:id', [authJwt.isAdministrator], billsControllers.getOneBill);

		// Post
		this.router.post('/bill', [authJwt.isCashier], billsControllers.createBill);
	}
}

const billsRoutes = new BillsRoutes();
export default billsRoutes.router;

import { Router } from 'express';

import { authControllers } from './auth.controllers';
import { authJwt } from './middlewares';

class AuthRoutes {
	constructor(public router: Router = Router()) {
		this.routes();
	}

	private routes(): void {
		// Post
		this.router.post('/singIn', authControllers.singIn);
		this.router.post('/singUp/admin', [authJwt.isSuperAdmin], authControllers.singUpAdmin);
		this.router.post(
			'/singUp/cashier',
			[authJwt.isAdministrator],
			authControllers.singUpCashier
		);
	}
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;

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
		this.router.post(
			'/singUp',
			[authJwt.verifyToken, authJwt.isSuperAdmin],
			authControllers.singUp
		);
	}
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;

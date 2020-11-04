import { Router } from 'express';

import { authenticationControllers } from './authentication.controllers';
import { authenticationJwt } from './middlewares';

class AuthenticationRoutes {
	constructor(public router: Router = Router()) {
		this.routes();
	}

	private routes(): void {
		// Post
		this.router.post('/singIn', authenticationControllers.singIn);
		this.router.post(
			'/singUp',
			[authenticationJwt.verifyToken, authenticationJwt.isSuperAdmin],
			authenticationControllers.singUp
		);
	}
}

const authenticationRoutes = new AuthenticationRoutes();
export default authenticationRoutes.router;

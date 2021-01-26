import { AuthUser } from './src/app/auth/models';

declare global {
	declare namespace Express {
		export interface Request {
			user: AuthUser;
		}
	}
}

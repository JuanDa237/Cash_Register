import { AuthUser } from './src/app/auth/models';

declare global {
	declare namespace Express {
		export interface Request {
			user: AuthUser;
		}
	}
}

declare namespace NodeJS {
	export interface ProcessEnv {
		PORT: number;
		DB: string;
		DB_HOST: string;
		DB_USER: string;
		DB_U_PASS: string;
		TOKEN_SECRET: string;
	}
}

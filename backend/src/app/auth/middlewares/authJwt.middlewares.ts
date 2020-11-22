import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';
import pool from '../../../database';
import keys from '../../../keys';

import { User } from '../../users/models';
import { Role } from '../../roles/data';
import { Role as IRole } from '../../roles/models';
import { Company } from '../../companies/models';

interface Payload {
	id: number;
	iat: number;
	exp: number;
}

export async function verifyToken(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void | Response<any>> {
	try {
		const token = request.header('Authorization')?.split(' ')[1];

		if (!token) return response.status(403).json({ message: 'No token provided.' });

		const payload: Payload = jwt.verify(
			token,
			process.env.TOKEN_SECRET || keys.noEnv.TOKEN
		) as Payload;

		const user: User[] = await (
			await pool
		).query('SELECT id, idCompany, idRole, username FROM users WHERE id = ?', [payload.id]);

		if (user.length <= 0) return response.status(404).json({ message: 'User not found.' });

		const company: Company[] = await (
			await pool
		).query('SELECT id FROM companies WHERE active = true AND id = ?', [user[0].idCompany]);

		if (company.length <= 0)
			return response.status(404).json({ message: 'Company not found.' });

		request.user = user[0];
		return next();
	} catch (error) {
		return response.status(401).json({ message: 'Unauthorized.' });
	}
}

export async function isCashier(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void | Response<any>> {
	const userRole: IRole[] = await (await pool).query('SELECT name FROM roles WHERE id = ?', [
		request.user.idRole
	]);

	if (
		userRole.length > 0 &&
		(userRole[0].name == Role.CASHIER ||
			userRole[0].name == Role.ADMIN ||
			userRole[0].name == Role.SUPERADMIN)
	) {
		return next();
	} else {
		return response.status(401).json({ message: 'Unauthorized.' });
	}
}

export async function isAdministrator(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void | Response<any>> {
	const userRole: IRole[] = await (await pool).query('SELECT name FROM roles WHERE id = ?', [
		request.user.idRole
	]);

	if (
		userRole.length > 0 &&
		(userRole[0].name == Role.ADMIN || userRole[0].name == Role.SUPERADMIN)
	) {
		return next();
	} else {
		return response.status(401).json({ message: 'Unauthorized.' });
	}
}

export async function isSuperAdmin(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void | Response<any>> {
	const userRole: IRole[] = await (await pool).query('SELECT name FROM roles WHERE id = ?', [
		request.user.idRole
	]);

	if (userRole.length > 0 && userRole[0].name == Role.SUPERADMIN) {
		return next();
	} else {
		return response.status(401).json({ message: 'Unauthorized.' });
	}
}

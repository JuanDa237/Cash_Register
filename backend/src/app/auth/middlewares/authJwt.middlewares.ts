import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';
import pool from '../../../database';
import keys from '../../../keys';

import { Role } from '../../roles/data';

import { AuthUser, Payload } from '../models';

// All functions have to be return type Promise<void | Response<any>>
async function verifyToken(request: Request, response: Response, next: NextFunction) {
	try {
		const token = request.header('Authorization')?.split(' ')[1];

		if (!token) return response.status(403).json({ message: 'No token provided.' });

		const payload: Payload = jwt.verify(
			token,
			process.env.TOKEN_SECRET || keys.TOKEN_SECRET
		) as Payload;

		const user: AuthUser = (
			await (await pool).query(
				`SELECT u.id, u.username, r.name AS role, u.idCompany, c.name AS company
				FROM user u
				INNER JOIN role r ON u.idRole = r.id
				INNER JOIN company c ON u.idCompany = c.id
				WHERE c.active = true AND u.id = ?`,
				[payload.id]
			)
		)[0];

		if (typeof user == 'undefined')
			return response.status(404).json({ message: 'User or company not found.' });

		request.user = user;
		return next();
	} catch (error) {
		return response.status(401).json({ message: 'Unauthorized.' });
	}
}

export async function isCashier(request: Request, response: Response, next: NextFunction) {
	return await verifyToken(request, response, async function () {
		const role = request.user.role;

		if (role == Role.CASHIER || role == Role.ADMIN || role == Role.SUPERADMIN) {
			return next();
		} else {
			return response.status(401).json({ message: 'Unauthorized.' });
		}
	});
}

export async function isAdministrator(request: Request, response: Response, next: NextFunction) {
	return await verifyToken(request, response, async function () {
		const role = request.user.role;

		if (role == Role.ADMIN || role == Role.SUPERADMIN) {
			return next();
		} else {
			return response.status(401).json({ message: 'Unauthorized.' });
		}
	});
}

export async function isSuperAdmin(request: Request, response: Response, next: NextFunction) {
	return await verifyToken(request, response, async function () {
		const role = request.user.role;

		if (role == Role.SUPERADMIN) {
			return next();
		} else {
			return response.status(401).json({ message: 'Unauthorized.' });
		}
	});
}

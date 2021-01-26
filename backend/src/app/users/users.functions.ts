// Database
import pool from '../../database';

// Models
import { Company } from '../companies/models';

class UsersFunctions {
	public async getUserQuery(id: number, role: string): Promise<any> {
		var user: any = (await (await pool).query('SELECT name FROM users WHERE id = ?', [id]))[0];
		user.role = role;

		return user;
	}

	public async getCompanyQuery(idCompany: number): Promise<Company> {
		const company: Company[] = await (
			await pool
		).query(
			'SELECT name, image, ticketMessage, homeDeliveries, visible FROM companies WHERE id = ? AND active = true',
			[idCompany]
		);

		return company[0];
	}
}

export const usersFunctions = new UsersFunctions();

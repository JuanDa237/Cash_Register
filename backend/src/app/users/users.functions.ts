// Database
import pool from '../../database';

// Models
import { Company } from '../companies/models';

class UsersFunctions {
	public async getUserQuery(id: number): Promise<any> {
		const user: any[] = await (
			await pool
		).query(
			'SELECT u.name, r.name as role FROM users u INNER JOIN roles r ON u.idRole = r.id WHERE u.id = ?',
			[id]
		);

		return user[0];
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

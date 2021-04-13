import mysql, { PoolConfig } from 'promise-mysql';
import keys from './keys';

const pool = startConnection();

export default pool;

// Functions

function startConnection() {
	const pool = mysql.createPool(dbOptions(true));

	pool.get('getConnection').then(async () => {
		await (await pool).releaseConnection;
		console.log('DB is connected.');
	});

	return pool;
}

function dbOptions(dev: boolean): PoolConfig {
	var dbInfo: PoolConfig;

	if (dev) {
		dbInfo = {
			database: process.env.DB || keys.DB.DB,
			host: process.env.DB_HOST || keys.DB.DB_HOST,
			user: process.env.DB_USER || keys.DB.DB_USER,
			password: process.env.DB_U_PASS || keys.DB.DB_U_PASS
		};
	} else {
		dbInfo = {
			database: process.env.DB,
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_U_PASS
		};
	}

	return dbInfo;
}

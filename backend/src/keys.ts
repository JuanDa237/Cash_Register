export default {
	PORT: 3000,
	DEV: true,
	TOKEN_SECRET: 'JuAnDaViDgAvIrIACoRrEaNOTENV',
	DB: {
		DB: 'cashRegisterDB',
		DB_HOST: 'localhost',
		DB_USER: 'cashier',
		DB_U_PASS: 'cashier321'
	},
	initialData: {
		company: {
			name: 'AdminCo',
			billMessage: 'Mensaje Prueba',
			visible: false,
			homeDelivery: true
		},
		user: {
			name: 'Juan Gaviria',
			username: 'juan',
			password: 'AdminCo123'
		}
	}
};

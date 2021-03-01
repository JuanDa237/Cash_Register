export default {
	database: {
		host: 'localhost',
		user: 'cashier',
		password: 'cashier321',
		database: 'cashRegisterDatabase'
	},
	initialData: {
		company: {
			name: 'Nueva Empresa',
			image: '',
			billMessage: '',
			visible: false,
			active: true
		},
		user: {
			name: 'Juan Gaviria',
			username: 'juan',
			password: 'contra'
		}
	},
	noEnv: {
		PORT: 3000,
		TOKEN: 'JuAnDaViDgAvIrIACoRrEaNOTENV'
	}
};

import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import keys from './keys';
import { createInitialData } from './app/roles/initialData';

import indexRoutes from './app/index/index.routes';
import companiesRoutes from './app/companies/companies.routes';
import categoriesRoutes from './app/categories/categories.routes';
import productsRoutes from './app/products/products.routes';
import ingredientsRoutes from './app/ingredients/ingredients.routes';
import billsRoutes from './app/bills/bills.routes';
import clientsRoutes from './app/clients/clients.routes';
import authRoutes from './app/auth/auth.routes';
import usersRoutes from './app/users/users.routes';

class Server {
	public app: Application;

	constructor() {
		// Enviroment variables
		dotenv.config();

		// Express
		this.app = express();
		this.configExpress();
		this.othersConfings();

		this.initialConfig();

		// Config routes
		this.routes();
	}

	private configExpress(): void {
		this.app.set('port', process.env.PORT || keys.PORT);
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
	}

	private othersConfings(): void {
		// Cors policy configuration
		this.app.use(cors());

		// See peticions in console
		this.app.use(morgan('dev'));
	}

	private initialConfig(): void {
		createInitialData();
	}

	private routes(): void {
		// Client
		this.app.use('/', express.static('public'));

		// Api
		this.app.use('/api', indexRoutes);
		this.app.use('/api', companiesRoutes);
		this.app.use('/api', categoriesRoutes);
		this.app.use('/api', productsRoutes);
		this.app.use('/api', ingredientsRoutes);
		this.app.use('/api', billsRoutes);
		this.app.use('/api', clientsRoutes);
		this.app.use('/api', usersRoutes);
		this.app.use('/api/auth', authRoutes);

		// Public folder
		this.app.use('/api/uploads', express.static('uploads'));
	}

	public start(): void {
		this.app.listen(this.app.get('port'), () => {
			console.log('Server on port ' + this.app.get('port'));
		});
	}
}

const server = new Server();
server.start();

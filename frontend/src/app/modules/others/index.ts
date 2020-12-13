import { CashRegisterModule } from './cash-register/cash-register.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { ClientsModule } from './clients/clients.module';
import { TicketsModule } from './tickets/tickets.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { CompaniesModule } from './companies/companies.module';

export const modules = [
	CashRegisterModule,
	CategoriesModule,
	ProductsModule,
	IngredientsModule,
	ClientsModule,
	TicketsModule,
	ConfigurationModule,
	CompaniesModule
];

export * from './cash-register/cash-register.module';
export * from './categories/categories.module';
export * from './products/products.module';
export * from './ingredients/ingredients.module';
export * from './clients/clients.module';
export * from './tickets/tickets.module';
export * from './configuration/configuration.module';
export * from './companies/companies.module';

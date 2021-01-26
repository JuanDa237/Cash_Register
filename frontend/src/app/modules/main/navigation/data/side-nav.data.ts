import { SideNavItems, SideNavSection } from '@modules/main/navigation/models';
import { Role } from '../models/index';

export const sideNavSections: SideNavSection[] = [
	{
		text: 'ADMINISTRAR',
		items: ['companies', 'administrators'],
		roles: [Role.SUPERADMIN]
	},
	{
		text: 'REGISTRAR',
		items: ['cashRegister'],
		roles: [Role.CASHIER, Role.ADMIN]
	},
	{
		text: 'EDITAR',
		items: ['categories', 'products', 'ingredients', 'clients', 'tickets'],
		roles: [Role.ADMIN]
	},
	{
		text: 'CONFIGURACION',
		items: ['configuration'],
		roles: [Role.ADMIN]
	}
];

export const sideNavItems: SideNavItems = {
	companies: {
		icon: 'fa-building',
		text: 'Compañias',
		submenu: [
			{
				text: 'Ver compañias',
				link: '/admin/companies'
			},
			{
				text: 'Crear',
				link: '/admin/companies/add'
			}
		]
	},
	administrators: {
		icon: 'fa-user-cog',
		text: 'Administradores',
		link: '/admin/administrators'
	},
	cashRegister: {
		icon: 'fa-cash-register',
		text: 'Registrar',
		link: '/company/cashRegister'
	},
	categories: {
		icon: 'fa-stream',
		text: 'Categorias',
		link: '/company/categories'
	},
	products: {
		icon: 'fa-boxes',
		text: 'Productos',
		submenu: [
			{
				text: 'Mis productos',
				link: '/company/products'
			},
			{
				text: 'Crear',
				link: '/company/products/add'
			}
		]
	},
	ingredients: {
		icon: 'fa-bread-slice',
		text: 'Ingredientes',
		link: '/company/ingredients'
	},
	clients: {
		icon: 'fa-users',
		text: 'Clientes',
		link: '/company/clients'
	},
	tickets: {
		icon: 'fa-clipboard',
		text: 'Registros',
		link: '/company/tickets'
	},
	configuration: {
		icon: 'fa-cog',
		text: 'Configuracion',
		submenu: [
			{
				text: 'Empresa',
				link: '/company/configuration/company'
			},
			{
				text: 'Tu',
				link: '/company/configuration/me'
			}
		]
	}
};

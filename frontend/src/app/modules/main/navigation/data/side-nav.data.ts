import { SideNavItems, SideNavSection } from '@modules/main/navigation/models';
import { Role } from '../models/index';

export const sideNavSections: SideNavSection[] = [
	{
		text: 'REGISTRAR',
		items: ['cashRegister'],
		roles: [Role.CASHIER, Role.ADMIN, Role.SUPERADMIN]
	},
	{
		text: 'EDITAR',
		items: ['categories', 'products', 'ingredients', 'clients', 'tickets'],
		roles: [Role.ADMIN, Role.SUPERADMIN]
	},
	{
		text: 'CONFIGURACION',
		items: ['configuration'],
		roles: [Role.ADMIN, Role.SUPERADMIN]
	}
];

export const sideNavItems: SideNavItems = {
	cashRegister: {
		icon: 'fa-cash-register',
		text: 'Registrar',
		link: '/company/cashRegister',
		activeClass: true
	},
	categories: {
		icon: 'fa-stream',
		text: 'Categorias',
		link: '/company/categories',
		activeClass: true
	},
	products: {
		icon: 'fa-boxes',
		text: 'Productos',
		submenu: [
			{
				text: 'Mis productos',
				link: '/company/products',
				activeClass: true
			},
			{
				text: 'Crear',
				link: '/company/products/add',
				activeClass: true
			}
		],
		activeClass: false
	},
	ingredients: {
		icon: 'fa-bread-slice',
		text: 'Ingredientes',
		link: '/company/ingredients',
		activeClass: true
	},
	clients: {
		icon: 'fa-users',
		text: 'Clientes',
		link: '/company/clients',
		activeClass: true
	},
	tickets: {
		icon: 'fa-clipboard',
		text: 'Registros',
		link: '/company/tickets',
		activeClass: true
	},
	configuration: {
		icon: 'fa-cog',
		text: 'Configuracion',
		submenu: [
			{
				text: 'Empresa',
				link: '/company/configuration/company',
				activeClass: true
			},
			{
				text: 'Tu',
				link: '/company/configuration/me',
				activeClass: true
			}
		],
		activeClass: false
	}
};

import { SideNavItems, SideNavSection } from '@modules/main/navigation/models';
import { Role } from '../models/index';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'REGISTRAR',
        items: ['cashRegister'],
        roles: [Role.CASHIER, Role.ADMINISTRATOR]
    },
    {
        text: 'EDITAR',
        items: ['categories', 'products', 'ingredients', 'clients', 'tickets'],
        roles: [Role.ADMINISTRATOR]
    },
    {
        text: 'CONFIGURACION',
        items: ['configuration'],
        roles: [Role.CASHIER, Role.ADMINISTRATOR]
    }
];

export const sideNavItems: SideNavItems = {
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
        link: '/company/products',
        submenu: [
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
        link: '/company/configuration'
    }
};
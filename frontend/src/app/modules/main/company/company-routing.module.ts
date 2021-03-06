import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Module
import { CompanyModule } from './company.module';

// Models
import { RouteData, Role } from '@modules/main/navigation/models/index';

// Containers
import * as companyContainers from './containers/index';
import * as othersContainers from '@modules/others/containers';

// Guards
import * as companyGuards from './guards/index';

const routes: Routes = [
	{
		path: '',
		component: companyContainers.CompanyComponent,
		canActivate: [companyGuards.AuthGuard],
		canActivateChild: [companyGuards.RoleToCompanyGuard],
		children: [
			{
				path: '',
				redirectTo: 'cashRegister',
				pathMatch: 'full'
			},
			{
				path: 'cashRegister',
				component: othersContainers.CashRegisterComponent,
				data: {
					title: 'Registradora',
					hideBreadcrumbs: true,
					roles: [Role.CASHIER, Role.ADMIN]
				} as RouteData
			},
			{
				path: 'categories',
				component: othersContainers.CategoriesComponent,
				data: {
					title: 'Categorias',
					hideBreadcrumbs: true,
					roles: [Role.ADMIN]
				} as RouteData
			},
			{
				path: 'products',
				loadChildren: () =>
					import('@modules/others/routes').then((m) => m.ProductsRoutingModule),
				data: {
					title: 'Productos',
					hideBreadcrumbs: true,
					roles: [Role.ADMIN]
				} as RouteData
			},
			{
				path: 'ingredients',
				component: othersContainers.IngredientsComponent,
				data: {
					title: 'Ingredientes',
					hideBreadcrumbs: true,
					roles: [Role.ADMIN]
				} as RouteData
			},
			{
				path: 'clients',
				component: othersContainers.ClientsComponent,
				data: {
					title: 'Clientes',
					hideBreadcrumbs: true,
					roles: [Role.ADMIN]
				} as RouteData
			},
			{
				path: 'bills',
				component: othersContainers.BillsComponent,
				data: {
					title: 'Registros',
					hideBreadcrumbs: true,
					roles: [Role.ADMIN]
				} as RouteData
			},
			{
				path: 'configuration/company',
				component: othersContainers.CompanyComponent,
				data: {
					title: 'Configuracion Empresa',
					hideBreadcrumbs: true,
					roles: [Role.ADMIN]
				} as RouteData
			},
			{
				path: 'configuration/company/edit',
				component: othersContainers.CompanyMainFormComponent,
				data: {
					title: 'Configuracion Empresa',
					breadcrumbs: [
						{
							text: 'Configuracion',
							link: '/company/configuration/company'
						},
						{
							text: 'Editando Empresa',
							active: true
						}
					],
					roles: [Role.ADMIN]
				} as RouteData
			},
			{
				path: 'configuration/me',
				component: othersContainers.UserComponent,
				data: {
					title: 'Configuracion Cuenta',
					hideBreadcrumbs: true,
					roles: [Role.CASHIER, Role.ADMIN]
				} as RouteData
			}
		]
	}
];

@NgModule({
	imports: [CompanyModule, RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CompanyRoutingModule {}

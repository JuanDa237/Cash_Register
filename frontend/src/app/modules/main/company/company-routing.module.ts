import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Module
import { CompanyModule } from './company.module';

//Models
import { RouteData, Role } from "@modules/main/navigation/models/index";

//Containers
import * as companyContainers from './containers/index';
import * as othersContainers from '@modules/others/containers';

//Guards
import * as companyGuards from './guards/index';

const routes: Routes = [
  {
    path: '',
    component: companyContainers.CompanyComponent,
    canActivate: [companyGuards.AuthenticationGuard],
    children: [
      {
        path: '',
        redirectTo: 'cashRegister',
        pathMatch: 'full'
      },
      {
        path: 'cashRegister',
        component: othersContainers.CashRegisterComponent,
        canActivate: [companyGuards.RoleGuard],
        data: {
          title: 'Registradora',
          hideBreadcrumbs: true,
          roles: [Role.CASHIER, Role.ADMINISTRATOR]
        } as RouteData
      },
      {
        path: 'categories',
        component: othersContainers.CategoriesComponent,
        data: {
          title: 'Categorias',
          hideBreadcrumbs: true,
          roles: [Role.ADMINISTRATOR]
        } as RouteData
      },
      {
        path: 'products',
        loadChildren: () =>
          import('@modules/others/routes').then(m => m.ProductsRoutingModule),
        data: {
          title: 'Productos',
          hideBreadcrumbs: true,
          roles: [Role.ADMINISTRATOR]
        } as RouteData
      },
      {
        path: 'ingredients',
        component: othersContainers.IngredientsComponent,
        data: {
          title: 'Ingredientes',
          hideBreadcrumbs: true,
          roles: [Role.ADMINISTRATOR]
        } as RouteData
      },
      {
        path: 'clients',
        component: othersContainers.ClientsComponent,
        data: {
          title: 'Clientes',
          hideBreadcrumbs: true,
          roles: [Role.ADMINISTRATOR]
        } as RouteData
      },
      {
        path: 'tickets',
        component: othersContainers.TicketsComponent,
        data: {
          title: 'Registros',
          hideBreadcrumbs: true,
          roles: [Role.ADMINISTRATOR]
        } as RouteData
      },
      {
        path: 'configuration',
        component: othersContainers.ConfigurationCompanyComponent,
        data: {
          title: 'Configuracion',
          hideBreadcrumbs: true,
          roles: [Role.ADMINISTRATOR]
        } as RouteData
      }
    ]
  }
];

@NgModule({
  imports: [CompanyModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
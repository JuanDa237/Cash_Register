import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Module
import { ProductsModule } from './products.module';

//Models
import { RouteData } from "@modules/main/navigation/models/index";

//Containers
import * as productsContainers from './containers/index';

const routes: Routes = [
  {
    path: '',
    component: productsContainers.ProductsIndexComponent,
    children: [
      {
        path: '',
        component: productsContainers.ProductsComponent,
        data: {
          title: 'Productos',
          hideBreadcrumbs: true
        } as RouteData
      },
      {
        path: 'add',
        component: productsContainers.ProductsPrincipalFormComponent,
        data: {
          title: 'Crea un producto',
          breadcrumbs: [
            {
                text: 'Productos',
                link: '/company/products'
            },
            {
                text: 'Crear',
                active: true
            }
          ]
        } as RouteData
      },
      {
        path: 'edit/:id',
        component: productsContainers.ProductsPrincipalFormComponent,
        data: {
          title: 'Edita el producto',
          breadcrumbs: [
            {
                text: 'Productos',
                link: '/company/products'
            },
            {
                text: 'Editar',
                active: true
            }
          ]
        } as RouteData
      }
    ]
  }
];

@NgModule({
  imports: [ProductsModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
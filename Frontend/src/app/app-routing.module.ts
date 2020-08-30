import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashRegisterComponent } from './companyWorkArea/components/cash-register/cash-register.component';
import { CategoriesComponent } from './companyWorkArea/app/categories/components/categories/categories.component';
import { ProductsComponent } from './companyWorkArea/app/product/components/products/products.component';
import { IngredientsComponent } from './companyWorkArea/app/ingredients/components/ingredients/ingredients.component';
import { ProductFormComponent } from './companyWorkArea/app/product/components/product-form/product-form.component';
import { ClientsComponent } from './companyWorkArea/app/clients/components/clients/clients.component';
import { TicketsComponent } from './companyWorkArea/app/tickets/components/tickets/tickets.component';
import { CompanyConfigurationComponent } from './companyWorkArea/components/company-configuration/company-configuration.component';
import { ErrorComponent } from './global/components/error/error.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/cashRegister",
    pathMatch: "full"
  },
  {
    path: "cashRegister",
    component: CashRegisterComponent
  },
  {
    path: "categories",
    component: CategoriesComponent
  },
  {
    path: "products",
    component: ProductsComponent
  },
  {
    path: "products/add",
    component: ProductFormComponent
  },
  {
    path: "product/edit/:id",
    component: ProductFormComponent
  },
  {
    path: "ingredients",
    component: IngredientsComponent
  },
  {
    path: "clients",
    component: ClientsComponent
  },
  {
    path: "tickets",
    component: TicketsComponent
  },
  {
    path: "configuration",
    component: CompanyConfigurationComponent
  },
  {
    path: "**",
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

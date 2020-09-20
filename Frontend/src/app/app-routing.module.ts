import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/app/home/home.component';
import { SignInComponent } from './home/app/sign-in/sign-in.component';
import { CashRegisterComponent } from './companyWorkArea/components/cash-register/cash-register.component';
import { CategoriesComponent } from './companyWorkArea/app/categories/components/categories/categories.component';
import { ProductsComponent } from './companyWorkArea/app/product/components/products/products.component';
import { IngredientsComponent } from './companyWorkArea/app/ingredients/components/ingredients/ingredients.component';
import { ProductFormComponent } from './companyWorkArea/app/product/components/product-form/product-form.component';
import { ClientsComponent } from './companyWorkArea/app/clients/components/clients/clients.component';
import { TicketsComponent } from './companyWorkArea/app/tickets/components/tickets/tickets.component';
import { CompanyConfigurationComponent } from './companyWorkArea/components/company-configuration/company-configuration.component';
import { ErrorComponent } from './global/components/error/error.component';

import { AuthenticationGuard } from './home/guards/authentication/authentication.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "signIn",
    component: SignInComponent
  },
  {
    path: "cashRegister",
    component: CashRegisterComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: "categories",
    component: CategoriesComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: "products",
    component: ProductsComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: "products/add",
    component: ProductFormComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: "product/edit/:id",
    component: ProductFormComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: "ingredients",
    component: IngredientsComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: "clients",
    component: ClientsComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: "tickets",
    component: TicketsComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: "configuration",
    component: CompanyConfigurationComponent,
    canActivate: [AuthenticationGuard]
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

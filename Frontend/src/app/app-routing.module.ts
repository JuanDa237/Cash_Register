import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashRegisterComponent } from './components/cash-register/cash-register.component';
import { ProductsComponent } from './components/products/products.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/cashRegister",
    pathMatch: "full"
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
    path: "cashRegister",
    component: CashRegisterComponent
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

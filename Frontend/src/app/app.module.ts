import { NgModule } from '@angular/core';

//Principal Component
import { AppComponent } from './app.component';

//Imports
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

//Librarys
import { DataTablesModule } from 'angular-datatables';

//Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { CashRegisterComponent } from './components/cash-register/cash-register.component';
import { ProductsComponent } from './components/products/products.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ErrorComponent } from './components/error/error.component';

//Services
import { ProductsService } from "./services/products/products.service";

//Pipes
import { FilterPipe } from './pipes/filter/filter.pipe';
import { ThousandsPipe } from './pipes/thousands/thousands.pipe';

//Font Awesome

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsComponent,
    IngredientsComponent,
    ProductFormComponent,
    ErrorComponent,
    FilterPipe,
    ThousandsPipe,
    CashRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import { NavbarComponent } from './companyWorkArea/components/navbar/navbar.component';
import { CashRegisterComponent } from './companyWorkArea/components/cash-register/cash-register.component';
import { CategoriesComponent } from './companyWorkArea/app/categories/components/categories/categories.component';
import { ProductsComponent } from './companyWorkArea/app/product/components/products/products.component';
import { IngredientsComponent } from './companyWorkArea/app/ingredients/components/ingredients/ingredients.component';
import { ProductFormComponent } from './companyWorkArea/app/product/components/product-form/product-form.component';
import { CompanyConfigurationComponent } from './companyWorkArea/components/company-configuration/company-configuration.component';
import { ErrorComponent } from './global/components/error/error.component';
import { ClientsComponent } from './companyWorkArea/app/clients/components/clients/clients.component';
import { TicketsComponent } from './companyWorkArea/app/tickets/components/tickets/tickets.component';

//Services
import { CategoriesService } from "./companyWorkArea/app/categories/services/categories/categories.service";
import { ProductsService } from "./companyWorkArea/app/product/services/products/products.service";
import { IngredientsService } from "./companyWorkArea/app/ingredients/services/ingredients/ingredients.service";
import { TicketsService } from "./companyWorkArea/app/tickets/services/tickets/tickets.service";
import { ClientsService } from "./companyWorkArea/app/clients/services/clients/clients.service";

//Pipes
import { FilterPipe } from './global/pipes/filter/filter.pipe';
import { ThousandsPipe } from './global/pipes/thousands/thousands.pipe';

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
    CashRegisterComponent,
    CompanyConfigurationComponent,
    ClientsComponent,
    TicketsComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [
    CategoriesService,
    ProductsService,
    IngredientsService,
    TicketsService,
    ClientsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

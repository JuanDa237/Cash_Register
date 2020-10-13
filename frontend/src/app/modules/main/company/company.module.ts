import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import * as companyContainers from './containers/index';
import * as companyServices from './services/index';
import * as companyGuards from './guards/index';

//Modules
import { NavigationModule } from '@modules/main/navigation/navigation.module';
import * as othersModules from '@modules/others/index';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    NavigationModule,
    othersModules.modules
  ],
  providers: [
    companyServices.services,
    companyGuards.guards,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: companyServices.TokenInterceptorService,
      multi: true
    }
  ],
  declarations: [
    companyContainers.containers
  ],
  exports: [
    companyContainers.containers
  ]
})
export class CompanyModule { }
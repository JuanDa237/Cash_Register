import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import * as ticketsServices from './services/index';
import * as ticketsComponents from './components/index';
import * as ticketsContainers from './containers/index';

//Modules
import { AppCommonModule } from "../app-common/app-common.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AppCommonModule
  ],
  providers: [
    ticketsServices.services
  ],
  declarations: [
    ticketsContainers.containers,
    ticketsComponents.components
  ],
  exports: [
    ticketsContainers.containers,
    ticketsComponents.components
  ]
})
export class TicketsModule { }
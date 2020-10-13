import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import * as landingComponents from "./components/index";
import * as landingContainers from "./containers/index";
import * as landingServices from "./services/index";
import * as landingGuards from "./guards/index";

//Modules
import { NavigationModule } from '@modules/main/navigation/navigation.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    NavigationModule
  ],
  providers: [
    landingServices.services,
    landingGuards.guards
  ],
  declarations: [
    landingComponents.components,
    landingContainers.containers
  ],
  exports: [
    landingComponents.components,
    landingContainers.containers
  ]
})
export class LandingModule { }
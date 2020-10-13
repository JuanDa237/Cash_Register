import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as configurationCompanyContainers from './containers/index';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    configurationCompanyContainers.containers
  ],
  exports: [
    configurationCompanyContainers.containers
  ]
})
export class ConfigurationCompanyModule { }
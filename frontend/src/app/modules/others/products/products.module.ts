import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import * as productsComponents from './components';
import * as productsContainers from './containers';
import * as productsServices from './services';

//Modules
import { AppCommonModule } from '../app-common/app-common.module';

@NgModule({
	imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, AppCommonModule],
	providers: [productsServices.services],
	declarations: [productsComponents.components, productsContainers.containers],
	exports: [productsComponents.components, productsContainers.containers]
})
export class ProductsModule {}

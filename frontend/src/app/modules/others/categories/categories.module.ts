import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import * as categoriesComponents from './components/index';
import * as categoriesContainers from './containers/index';
import * as categoriesServices from './services/index';

// Modules
import { AppCommonModule } from '../app-common/app-common.module';

@NgModule({
	imports: [CommonModule, ReactiveFormsModule, AppCommonModule],
	providers: [categoriesServices.services],
	declarations: [categoriesComponents.components, categoriesContainers.containers],
	exports: [categoriesComponents.components, categoriesContainers.containers]
})
export class CategoriesModule {}

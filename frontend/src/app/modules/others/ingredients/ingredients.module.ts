import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import * as ingredientsComponents from './components/index';
import * as ingredientsContainers from './containers/index';
import * as ingredientsServices from './services/index';

// Modules
import { AppCommonModule } from '../app-common/app-common.module';

@NgModule({
	imports: [CommonModule, ReactiveFormsModule, AppCommonModule],
	providers: [ingredientsServices.services],
	declarations: [ingredientsComponents.components, ingredientsContainers.containers],
	exports: [ingredientsComponents.components, ingredientsContainers.containers]
})
export class IngredientsModule {}

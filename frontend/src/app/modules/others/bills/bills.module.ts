import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import * as billsServices from './services/index';
import * as billsComponents from './components/index';
import * as billsContainers from './containers/index';

// Modules
import { AppCommonModule } from '../app-common/app-common.module';

@NgModule({
	imports: [CommonModule, ReactiveFormsModule, RouterModule, AppCommonModule],
	providers: [billsServices.services],
	declarations: [billsContainers.containers, billsComponents.components],
	exports: [billsContainers.containers, billsComponents.components]
})
export class BillsModule {}

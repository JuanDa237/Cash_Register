import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as appCommonComponents from './components/index';

//Imports
import { DataTablesModule } from 'angular-datatables';

@NgModule({
	imports: [CommonModule, DataTablesModule],
	declarations: [appCommonComponents.components],
	exports: [appCommonComponents.components]
})
export class AppCommonModule {}

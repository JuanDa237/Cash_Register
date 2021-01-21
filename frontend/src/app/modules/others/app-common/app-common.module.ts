import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as appCommonComponents from './components';
import * as appCommonDirectives from './directives';

// Imports
import { DataTablesModule } from 'angular-datatables';

@NgModule({
	imports: [CommonModule, DataTablesModule],
	declarations: [appCommonComponents.components, appCommonDirectives.directives],
	exports: [appCommonComponents.components, appCommonDirectives.directives]
})
export class AppCommonModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Containers
import * as errorContainers from './containers';

// Modules
import { NavigationModule } from '@modules/main/navigation/navigation.module';

@NgModule({
	imports: [CommonModule, RouterModule, NavigationModule],
	declarations: [errorContainers.containers],
	exports: [errorContainers.containers]
})
export class ErrorModule {}

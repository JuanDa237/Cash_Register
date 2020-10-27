import { Component, Input } from '@angular/core';

//Models
import { Breadcrumb } from '@modules/main/navigation/models';

@Component({
	selector: 'app-breadcrumbs',
	templateUrl: './breadcrumbs.component.html'
})
export class BreadcrumbsComponent {
	@Input()
	public breadcrumbs!: Breadcrumb[];
}

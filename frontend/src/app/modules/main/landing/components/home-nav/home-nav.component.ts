import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'app-home-nav',
	templateUrl: './home-nav.component.html'
})
export class HomeNavComponent {
	constructor(private router: Router) {}

	to(id: string) {
		var element = document.getElementById(id);
		element?.scrollIntoView({ behavior: 'smooth' });

		this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
			if (!element) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
		});
	}
}

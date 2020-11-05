import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'app-home-nav',
	templateUrl: './home-nav.component.html',
	styleUrls: ['./home-nav.component.scss']
})
export class HomeNavComponent {
	public addActive: boolean[];

	constructor(private router: Router) {
		this.addActive = new Array<boolean>(4);

		for (var i = 0; i < this.addActive.length; i++) {
			this.addActive[i] = false;
		}
	}

	to(id: string, index: number) {
		//Add active class
		for (var i = 0; i < this.addActive.length; i++) {
			this.addActive[i] = false;
		}
		this.addActive[index] = true;

		//Scroll to the section
		var element = document.getElementById(id);
		element?.scrollIntoView({ behavior: 'smooth' });

		this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
			if (!element) {
				document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
			}
		});
	}
}

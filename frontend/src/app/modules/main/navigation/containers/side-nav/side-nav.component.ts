import { Component, OnInit } from '@angular/core';

// Models
import { SideNavItems, SideNavSection } from '@modules/main/navigation/models';

// Data
import { sideNavItems, sideNavSections } from '@modules/main/navigation/data';

// Services
import { UserService } from '../../services/index';

@Component({
	selector: 'app-side-nav',
	templateUrl: './side-nav.component.html',
	styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
	public sideNavItems: SideNavItems;
	public sideNavSections: SideNavSection[];

	public username: string;
	public role: string;

	constructor(private userService: UserService) {
		this.sideNavItems = sideNavItems;
		this.sideNavSections = sideNavSections;
		this.username = '';
		this.role = '';
	}

	ngOnInit(): void {
		this.getUser();
	}

	private getUser(): void {
		const user = this.userService.getUser();
		this.username = user.name;
		this.role = user.role;

		this.actualizeNavSections();
	}

	private actualizeNavSections(): void {
		this.sideNavSections = [];

		sideNavSections.forEach((section) => {
			section.roles.forEach((role) => {
				if (this.role == role) this.sideNavSections.push(section);
			});
		});
	}
}

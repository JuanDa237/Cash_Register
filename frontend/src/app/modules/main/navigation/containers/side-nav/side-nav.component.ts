import { Component, OnInit } from '@angular/core';

//Models
import { SideNavItems, SideNavSection } from '@modules/main/navigation/models';

//Data
import { sideNavItems, sideNavSections } from '@modules/main/navigation/data';

//Services
import { UsersService } from '../../services/index';

@Component({
	selector: 'app-side-nav',
	templateUrl: './side-nav.component.html',
	styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
	public sideNavItems: SideNavItems;
	public sideNavSections: SideNavSection[];

	public userName: string;
	public role: string;

	constructor(private usersService: UsersService) {
		this.sideNavItems = sideNavItems;
		this.sideNavSections = sideNavSections;
		this.userName = '';
		this.role = '';
	}

	ngOnInit(): void {
		this.getUser();
	}

	private getUser(): void {
		this.usersService.getUser().subscribe(
			(response) => {
				this.userName = response.name;
				this.role = response.role;

				this.actualizeNavSections();
			},
			(error) => {
				throw new Error(error);
			}
		);
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

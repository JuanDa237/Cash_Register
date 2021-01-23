import { Component, OnInit } from '@angular/core';

// Models
import { SideNavItems, SideNavSection } from '@modules/main/navigation/models';
import { Company, createEmptyCompany } from '@app/modules/others/companies/models';

// Data
import { sideNavItems, sideNavSections } from '@modules/main/navigation/data';

// Services
import { UserDataService } from '../../services';

//Api
import { environment } from '@enviroment/environment';

@Component({
	selector: 'app-side-nav',
	templateUrl: './side-nav.component.html',
	styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
	public sideNavItems: SideNavItems;
	public sideNavSections: SideNavSection[];

	public company: Company;
	public role: string;
	public apiUrl: string;

	constructor(private userData: UserDataService) {
		this.sideNavItems = sideNavItems;
		this.sideNavSections = sideNavSections;
		this.role = '';
		this.apiUrl = environment.apiUrl;
		this.company = createEmptyCompany();
	}

	ngOnInit(): void {
		this.getUser();
		this.getCompany();
	}

	private getUser(): void {
		this.actualizeNavSections(this.userData.getUser().role);
	}

	private getCompany(): void {
		this.company = this.userData.getCompany();
	}

	private actualizeNavSections(userRole: string): void {
		this.sideNavSections = [];

		sideNavSections.forEach((section) => {
			section.roles.forEach((role) => {
				if (userRole == role) this.sideNavSections.push(section);
			});
		});
	}
}

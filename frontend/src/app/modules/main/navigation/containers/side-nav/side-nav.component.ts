import { Component, OnInit } from '@angular/core';

// Models
import { SideNavItems, SideNavSection } from '@modules/main/navigation/models';
import { Company, createEmptyCompany } from '@app/modules/others/companies/models';

// Data
import { sideNavItems, sideNavSections } from '@modules/main/navigation/data';

// Services
import { UserService } from '../../services/index';
import { CompanyService } from '@app/modules/others/companies/services';

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

	public loadingCompany: boolean;

	constructor(private userService: UserService, private companyService: CompanyService) {
		this.sideNavItems = sideNavItems;
		this.sideNavSections = sideNavSections;
		this.role = '';
		this.apiUrl = environment.apiUrl;
		this.company = createEmptyCompany();
		this.loadingCompany = true;
	}

	ngOnInit(): void {
		this.getUser();
		this.getCompany();
	}

	private getUser(): void {
		this.actualizeNavSections(this.userService.getUser().role);
	}

	private getCompany(): void {
		this.companyService.getMyCompany().subscribe(
			(resolve) => {
				this.company = resolve;
				this.loadingCompany = false;
			},
			(error) => {
				throw new Error(error);
			}
		);
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

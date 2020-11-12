import { Component, OnInit } from '@angular/core';
import { Company, createEmptyCompany } from '../../models';
import { CompanyService } from '../../services';

@Component({
	selector: 'app-configuration-company',
	templateUrl: './configuration-company.component.html'
})
export class ConfigurationCompanyComponent implements OnInit {
	public company: Company;

	constructor(private companyService: CompanyService) {
		this.company = createEmptyCompany();
	}

	ngOnInit(): void {
		this.getCompany();
	}

	private getCompany(): void {
		this.companyService.getCompany().subscribe(
			(resolve) => {
				this.company = resolve;
			},
			(error) => {
				throw new Error(error);
			}
		);
	}
}

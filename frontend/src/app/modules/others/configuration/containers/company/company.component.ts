import { Component, OnInit } from '@angular/core';
import { Company, createEmptyCompany } from '../../models';
import { CompanyService } from '../../services';

@Component({
	selector: 'app-config-company',
	templateUrl: './company.component.html'
})
export class CompanyComponent implements OnInit {
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

import { Component, OnInit } from '@angular/core';
import { Company, createEmptyCompany } from '../../../companies/models';
import { CompanyService } from '../../../companies/services';

//Api
import { environment } from '@enviroment/environment';

@Component({
	selector: 'app-config-company',
	templateUrl: './company.component.html'
})
export class CompanyComponent implements OnInit {
	public company: Company;
	public apiUrl: string;
	public loading: boolean;

	constructor(private companyService: CompanyService) {
		this.company = createEmptyCompany();
		this.apiUrl = environment.apiUrl;
		this.loading = true;
	}

	ngOnInit(): void {
		this.getCompany();
	}

	private getCompany(): void {
		this.companyService.getMyCompany().subscribe(
			(resolve) => {
				this.company = resolve;
				this.loading = false;
			},
			(error) => {
				throw new Error(error);
			}
		);
	}
}

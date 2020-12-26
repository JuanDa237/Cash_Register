import { Component, OnInit, ViewChild } from '@angular/core';

import { Company } from '../../models';
import { CompanyService } from '../../services';

import { TableComponent } from '@app/modules/others/app-common/components';

@Component({
	selector: 'app-companies',
	templateUrl: './companies.component.html'
})
export class CompaniesComponent implements OnInit {
	public companies: Company[];
	public loading: boolean;

	@ViewChild(TableComponent)
	private table!: TableComponent;

	constructor(private companyService: CompanyService) {
		this.companies = [];
		this.loading = true;
	}

	ngOnInit(): void {
		this.getCompanies();
	}

	private getCompanies(): void {
		this.companyService.getAllCompanies().subscribe(
			(resolve) => {
				this.companies = resolve;
				this.loading = false;
				this.table.renderTable();
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	// Html methods
	public deleteCompany(id: number): void {}
}

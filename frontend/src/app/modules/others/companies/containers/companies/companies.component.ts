import { Component, OnInit, ViewChild } from '@angular/core';

import { Company } from '../../models';
import { CompanyService } from '../../services';

import { TableComponent } from '@app/modules/others/app-common/components';
import { Sweet } from '@app/modules/others/app-common/libs';

@Component({
	selector: 'app-companies',
	templateUrl: './companies.component.html'
})
export class CompaniesComponent implements OnInit {
	public companies: Company[];
	public loading: boolean;

	@ViewChild(TableComponent)
	private table!: TableComponent;

	private sweet: Sweet;

	constructor(private companyService: CompanyService) {
		this.companies = [];
		this.loading = true;
		this.sweet = new Sweet();
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
	public async deleteCompany(id: number): Promise<void> {
		if (await this.sweet.delete('¿Estas seguro de borrar la compañia?')) {
			this.companyService.deleteCompany(id).subscribe(
				(resolve) => {
					const index: number = this.companies
						.map((x) => {
							return x.id;
						})
						.indexOf(id);
					this.companies.splice(index, 1);

					this.sweet.deleted('La compañia se elimino satisfactoriamente');
				},
				(error) => {
					this.sweet.error('Ocurrio un error');
					throw new Error(error);
				}
			);
		}
	}
}

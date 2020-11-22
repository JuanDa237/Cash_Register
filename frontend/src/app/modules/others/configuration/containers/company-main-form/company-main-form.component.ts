import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyFormComponent } from '../../components';

import { Company, createEmptyCompany } from '../../models';
import { CompanyService } from '../../services';

// Libs
import { Sweet } from '@modules/others/app-common/libs';
import { Router } from '@angular/router';

@Component({
	selector: 'app-company-main-form',
	templateUrl: './company-main-form.component.html'
})
export class CompanyMainFormComponent implements OnInit {
	public company: Company;
	public invalidForm: boolean;

	@ViewChild(CompanyFormComponent)
	public formChild!: CompanyFormComponent;

	private sweet: Sweet;

	constructor(private companyServices: CompanyService, private router: Router) {
		this.company = createEmptyCompany();
		this.invalidForm = false;
		this.sweet = new Sweet();
	}

	ngOnInit(): void {
		this.getCompany();
	}

	private getCompany(): void {
		this.companyServices.getCompany().subscribe(
			(resolve) => {
				this.company = resolve;

				this.formChild.setCompanyValues(this.company);
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	public async updateCompany(): Promise<void> {
		if (await this.sweet.update('¿Estas seguro de editar la empresa?')) {
			this.companyServices.updateCompany(this.formChild.getCompanyValues()).subscribe(
				(resolve) => {
					this.sweet.created('Se edito la empresa satisfactoriamente');
					this.router.navigate(['company/configuration/company']);
				},
				(error) => {
					this.sweet.error('Ocurrio un error');
					throw new Error(error);
				}
			);
		}
	}
}

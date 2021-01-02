import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Company, createEmptyCompany } from '../../models';
import { CompanyService } from '../../services';

import { CompanyFormComponent } from '../../components';

// Libs
import { Sweet } from '@modules/others/app-common/libs';

@Component({
	selector: 'app-companies-form',
	templateUrl: './companies-form.component.html'
})
export class CompaniesFormComponent {
	public company: Company;
	public creating: boolean;
	public invalidForm: boolean;

	@ViewChild(CompanyFormComponent)
	public formChild!: CompanyFormComponent;

	private sweet: Sweet;

	constructor(
		private companyService: CompanyService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {
		this.creating = true;
		this.invalidForm = true;
		this.company = createEmptyCompany();
		this.sweet = new Sweet();
	}

	ngOnInit(): void {
		this.getCompany();
	}

	private getCompany(): void {
		var id: number = this.activatedRoute.snapshot.params.id;
		this.creating = id == null;

		if (!this.creating) {
			this.companyService.getCompany(id).subscribe(
				(resolve) => {
					this.company = resolve;
					this.company.id = id;
					this.formChild.setCompanyValues(this.company);
				},
				(error) => {
					this.sweet.deleted('Ocurrio un error');
					throw new Error(error);
				}
			);
		}
	}

	public createOrUpdateCompany(): void {
		this.creating ? this.createCompany() : this.updateCompany();
	}

	private createCompany(): void {
		this.companyService.createCompany(this.formChild.getCompanyValues()).subscribe(
			(resolve) => {
				this.router.navigate(['/admin/companies']);
				this.sweet.created('Se creo la compañia satisfactoriamente');
			},
			(error) => {
				this.sweet.deleted('Ocurrio un error');
				throw new Error(error);
			}
		);
	}

	public updateCompany(): void {
		this.companyService.updateCompany(this.formChild.getCompanyValues()).subscribe(
			(resolve) => {
				this.router.navigate(['/admin/companies']);
				this.sweet.created('Se edito la compañia satisfactoriamente');
			},
			(error) => {
				this.sweet.deleted('Ocurrio un error');
				throw new Error(error);
			}
		);
	}

	public async deleteCompany(): Promise<void> {
		if (await this.sweet.delete('¿Estas seguro de borrar la compañia?')) {
			this.companyService.deleteCompany(this.company.id).subscribe(
				(resolve) => {
					this.router.navigate(['/admin/companies']);
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

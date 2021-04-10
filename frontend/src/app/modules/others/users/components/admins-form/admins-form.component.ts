import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Company } from '@app/modules/others/companies/models';
import { CompanyService } from '@app/modules/others/companies/services';
import { Admin } from '../../model';

@Component({
	selector: 'app-admins-form',
	templateUrl: './admins-form.component.html'
})
export class AdminsFormComponent implements OnInit {
	public adminForm: FormGroup;

	@Input()
	public idForm: string;

	@Input()
	public creating: boolean;

	@Output()
	private onSubmitEvent: EventEmitter<null>;

	@Output()
	private invalidForm: EventEmitter<boolean>;

	public companies: Company[];

	constructor(private companyService: CompanyService) {
		this.creating = true;

		this.adminForm = new FormGroup({
			id: new FormControl(0),
			name: new FormControl('', [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(30)
			]),
			username: new FormControl('', [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(30)
			]),
			idCompany: new FormControl(null, Validators.required)
		});

		this.companies = new Array<Company>(0);
		this.idForm = '';

		this.onSubmitEvent = new EventEmitter<null>();
		this.invalidForm = new EventEmitter<boolean>();
	}

	ngOnInit(): void {
		this.adminForm.valueChanges.subscribe(() => {
			this.invalidForm.emit(this.adminForm.invalid);
		});

		this.getCompanies();
	}

	private getCompanies(): void {
		this.companyService.getAllCompanies().subscribe(
			(resolve) => {
				this.companies = resolve;
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	public submitEvent(): void {
		if (this.adminForm.valid) this.onSubmitEvent.emit(null);
	}

	public getAdminValues(): Admin {
		return this.adminForm.value as Admin;
	}

	public setAdminValues(admin: Admin, disabled: boolean): void {
		this.adminForm.patchValue({
			id: admin.id,
			name: admin.name,
			username: admin.username,
			idCompany: admin.idCompany,
			company: admin.company
		});

		disabled
			? this.adminForm.get('idCompany')?.disable()
			: this.adminForm.get('idCompany')?.enable();
	}

	// Getters

	get id() {
		return this.adminForm.get('id');
	}

	get name() {
		return this.adminForm.get('name');
	}

	get username() {
		return this.adminForm.get('username');
	}

	get idCompany() {
		return this.adminForm.get('idCompany');
	}
}

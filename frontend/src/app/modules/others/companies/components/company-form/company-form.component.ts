import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Company, CompanyFile } from '../../models';

@Component({
	selector: 'app-company-form',
	templateUrl: './company-form.component.html'
})
export class CompanyFormComponent implements OnInit {
	public companyForm: FormGroup;

	@Input()
	public idForm: string;

	@Output()
	private onSubmitEvent: EventEmitter<null>;

	@Output()
	private invalidForm: EventEmitter<boolean>;

	private selectedFile: File | null;

	constructor() {
		this.companyForm = new FormGroup({
			name: new FormControl('', [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(30)
			]),
			ticketMessage: new FormControl('', [Validators.maxLength(255)]),
			visible: new FormControl(false, [Validators.required]),
			image: new FormControl(null)
		});

		this.idForm = '';

		this.onSubmitEvent = new EventEmitter<null>();
		this.invalidForm = new EventEmitter<boolean>();

		this.selectedFile = null;
	}

	ngOnInit(): void {
		this.companyForm.valueChanges.subscribe(() => {
			this.invalidForm.emit(this.companyForm.invalid);
		});
	}

	public submitEvent(): void {
		if (this.companyForm.valid) this.onSubmitEvent.emit(null);
	}

	public getCompanyValues(): CompanyFile {
		var company: CompanyFile = this.companyForm.value as Company;
		company.imageFile = this.selectedFile;
		return company;
	}

	public setCompanyValues(company: Company): void {
		this.companyForm.patchValue({
			name: company.name,
			ticketMessage: company.ticketMessage,
			visible: company.visible
		});
	}

	public onFileChange(event: any): void {
		this.selectedFile = event.target.files[0];
	}
}

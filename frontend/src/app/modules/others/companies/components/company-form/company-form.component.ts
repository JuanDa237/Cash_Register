import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Company, CompanyFile } from '../../models';
import { environment } from '@enviroment/environment';

@Component({
	selector: 'app-company-form',
	templateUrl: './company-form.component.html',
	styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {
	public companyForm: FormGroup;

	@Input()
	public idForm: string;

	@Output()
	private onSubmitEvent: EventEmitter<null>;

	@Output()
	private invalidForm: EventEmitter<boolean>;

	public selectedFile: File | null;
	public imagePreview: ArrayBuffer | string | null;

	constructor() {
		this.companyForm = new FormGroup({
			id: new FormControl(null),
			name: new FormControl('', [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(30)
			]),
			ticketMessage: new FormControl('', [Validators.maxLength(255)]),
			homeDeliveries: new FormControl(false, [Validators.required]),
			visible: new FormControl(false, [Validators.required]),
			image: new FormControl(null)
		});

		this.idForm = '';

		this.onSubmitEvent = new EventEmitter<null>();
		this.invalidForm = new EventEmitter<boolean>();

		this.selectedFile = null;
		this.imagePreview = '';
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
			id: company.id,
			name: company.name,
			ticketMessage: company.ticketMessage,
			homeDeliveries: company.homeDeliveries,
			visible: company.visible
		});

		this.imagePreview = environment.apiUrl + company.image;
	}

	public onFileChange(event: any): void {
		if (event.target.files && event.target.files[0]) {
			this.selectedFile = event.target.files[0];

			// Image preview
			const reader = new FileReader();
			reader.onload = (e) => (this.imagePreview = reader.result);
			reader.readAsDataURL(this.selectedFile as Blob);
		}
	}
}

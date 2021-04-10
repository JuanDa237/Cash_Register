import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from '../../models';

@Component({
	selector: 'app-clients-form',
	templateUrl: './clients-form.component.html'
})
export class ClientsFormComponent implements OnInit {
	public clientForm: FormGroup;

	@Input()
	public idForm: string;

	@Output()
	private onSubmitEvent: EventEmitter<null>;

	@Output()
	private invalidForm: EventEmitter<boolean>;

	constructor() {
		this.clientForm = new FormGroup({
			id: new FormControl(''),
			name: new FormControl('', [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(30)
			]),
			address: new FormControl('', Validators.maxLength(30)),
			phoneNumber: new FormControl('', Validators.maxLength(30)),
			creationDate: new FormControl('')
		});
		this.idForm = '';

		this.onSubmitEvent = new EventEmitter<null>();
		this.invalidForm = new EventEmitter<boolean>();
	}

	ngOnInit(): void {
		this.clientForm.valueChanges.subscribe(() => {
			this.invalidForm.emit(this.clientForm.invalid);
		});
	}

	public submitEvent(): void {
		if (this.clientForm.valid) this.onSubmitEvent.emit(null);
	}

	public getClientValues(): Client {
		return this.clientForm.value as Client;
	}

	public setClientValues(client: Client): void {
		this.clientForm.patchValue({
			id: client.id,
			name: client.name,
			address: client.address,
			phoneNumber: client.phoneNumber,
			creationDate: client.creationDate
		});
	}

	// Getters

	get id() {
		return this.clientForm.get('id');
	}

	get name() {
		return this.clientForm.get('name');
	}

	get address() {
		return this.clientForm.get('address');
	}

	get phoneNumber() {
		return this.clientForm.get('phoneNumber');
	}

	get creationDate() {
		return this.clientForm.get('creationDate');
	}
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../models';

@Component({
	selector: 'app-categories-form',
	templateUrl: './categories-form.component.html'
})
export class CategoriesFormComponent implements OnInit {
	public categoryForm: FormGroup;

	@Input()
	public idForm: string;

	@Output()
	private onSubmitEvent: EventEmitter<null>;

	@Output()
	private invalidForm: EventEmitter<boolean>;

	constructor() {
		this.categoryForm = new FormGroup({
			id: new FormControl(0),
			name: new FormControl('', [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(30)
			])
		});

		this.idForm = '';

		this.onSubmitEvent = new EventEmitter<null>();
		this.invalidForm = new EventEmitter<boolean>();
	}

	ngOnInit(): void {
		this.categoryForm.valueChanges.subscribe(() => {
			this.invalidForm.emit(this.categoryForm.invalid);
		});
	}

	public submitEvent(): void {
		if (this.categoryForm.valid) this.onSubmitEvent.emit(null);
	}

	public getCategoryValues(): Category {
		return this.categoryForm.value as Category;
	}

	public setCategoryValues(category: Category): void {
		this.categoryForm.patchValue({
			id: category.id,
			name: category.name
		});
	}

	// Getters

	get id() {
		return this.categoryForm.get('id');
	}

	get name() {
		return this.categoryForm.get('name');
	}
}

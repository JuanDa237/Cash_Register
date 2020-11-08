import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Ingredient } from '../../models';

@Component({
	selector: 'app-ingredients-form',
	templateUrl: './ingredients-form.component.html'
})
export class IngredientsFormComponent implements OnInit {
	public ingredientForm: FormGroup;

	@Input()
	public idForm: string;

	@Output()
	private onSubmitEvent: EventEmitter<null>;

	@Output()
	private invalidForm: EventEmitter<boolean>;

	constructor() {
		this.ingredientForm = new FormGroup({
			id: new FormControl(0),
			name: new FormControl('', [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(30)
			]),
			priceByUnit: new FormControl(0, Validators.required),
			amount: new FormControl(0, Validators.required)
		});
		this.idForm = '';

		this.onSubmitEvent = new EventEmitter<null>();
		this.invalidForm = new EventEmitter<boolean>();
	}

	ngOnInit(): void {
		this.ingredientForm.valueChanges.subscribe(() => {
			this.invalidForm.emit(this.ingredientForm.invalid);
		});
	}

	public submitEvent(): void {
		if (this.ingredientForm.valid) this.onSubmitEvent.emit(null);
	}

	public getIngredientValues(): Ingredient {
		return this.ingredientForm.value as Ingredient;
	}

	public setIngredientsValues(ingredient: Ingredient): void {
		this.ingredientForm.patchValue({
			id: ingredient.id,
			name: ingredient.name,
			priceByUnit: ingredient.priceByUnit,
			amount: ingredient.amount
		});
	}
}

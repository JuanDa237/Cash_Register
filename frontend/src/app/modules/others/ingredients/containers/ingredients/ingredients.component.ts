import { Component, OnInit, ViewChild } from '@angular/core';

//Models
import { Ingredient, createEmptyIngredient } from '../../models/index';

//Services
import { IngredientsService } from '../../services/index';

//Components
import { IngredientsFormComponent } from '../../components/index';
import { TableComponent } from '@modules/others/app-common/components';

@Component({
	selector: 'app-ingredients',
	templateUrl: './ingredients.component.html'
})
export class IngredientsComponent implements OnInit {
	public ingredients: Array<Ingredient>;
	public creating: boolean;

	public invalidForm: boolean;
	public loading: boolean;

	@ViewChild(IngredientsFormComponent)
	public formChild!: IngredientsFormComponent;

	@ViewChild(TableComponent)
	private table!: TableComponent;

	constructor(private ingredientsService: IngredientsService) {
		this.ingredients = new Array<Ingredient>(0);
		this.creating = false;
		this.invalidForm = false;
		this.loading = true;
	}

	ngOnInit(): void {
		this.getIngredients();
	}

	private getIngredients(): void {
		this.ingredientsService.getIngredients().subscribe(
			(response) => {
				this.ingredients = response;
				this.loading = false;

				this.table.renderTable();
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	//Methods for html

	public deleteIngredient(ingredient: Ingredient): void {
		if (this.validateIngredient(ingredient)) {
			this.ingredientsService.deleteIngredient(ingredient.id).subscribe(
				(response) => {
					const index: number = this.ingredients
						.map((x) => {
							return x.id;
						})
						.indexOf(ingredient.id);
					this.ingredients.splice(index, 1);
				},
				(error) => {
					throw new Error(error);
				}
			);
		}
	}

	//Create and update
	public createOrUpdateIngredient(): void {
		this.creating ? this.createIngredient() : this.updateIngredient();
	}

	private createIngredient(): void {
		const ingredient: Ingredient = this.formChild.getIngredientValues();

		if (this.validateIngredient(ingredient)) {
			this.ingredientsService.saveIngredient(ingredient).subscribe(
				(response) => {
					this.ingredients.push(ingredient);
				},
				(error) => {
					throw new Error(error);
				}
			);
		}
	}

	private updateIngredient(): void {
		const ingredient: Ingredient = this.formChild.getIngredientValues();

		if (this.validateIngredient(ingredient)) {
			this.ingredientsService.updateIngredient(ingredient).subscribe(
				(response) => {
					const index: number = this.ingredients
						.map((x) => {
							return x.id;
						})
						.indexOf(ingredient.id);
					this.ingredients[index] = ingredient;
				},
				(error) => {
					throw new Error(error);
				}
			);
		}
	}

	private validateIngredient(ingredient: Ingredient): boolean {
		return (
			ingredient != null &&
			ingredient.name.trim() != '' &&
			ingredient.priceByUnit != null &&
			ingredient.amount != null
		);
	}

	//Html Events
	public changeModal(ingredient: Ingredient | null): void {
		if ((this.creating = ingredient == null))
			this.formChild.setIngredientsValues(createEmptyIngredient());
		else this.formChild.setIngredientsValues(ingredient);
	}
}

import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IngredientsService } from '@modules/others/ingredients/services';
import { Ingredient, IngredientInProduct } from '@modules/others/ingredients/models';

import { ProductsService } from '../../services';

import { TableComponent } from '@modules/others/app-common/components';
import { Product, ProductWithIngredients } from '../../models';

@Component({
	selector: 'app-ingredients-form',
	templateUrl: './ingredients-form.component.html'
})
export class IngredientsFormComponent implements OnInit {
	public ingredients: Ingredient[];
	public spendingAmounts: number[];

	public loading: boolean;

	@ViewChild(TableComponent)
	private table!: TableComponent;

	@Output()
	public inputAmount: EventEmitter<null>;

	constructor(
		private ingredientsService: IngredientsService,
		private productsService: ProductsService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {
		this.ingredients = new Array<Ingredient>(0);
		this.spendingAmounts = new Array<number>(0);

		this.loading = true;

		this.inputAmount = new EventEmitter<null>();
	}

	ngOnInit(): void {
		this.getIngredients();
	}

	// Private functions
	private getIngredients(): void {
		this.ingredientsService.getIngredients().subscribe(
			(response) => {
				this.ingredients = response;
				this.loading = false;

				this.table.renderTable();
				this.getIngredientsInProduct();
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	private getIngredientsInProduct(): void {
		const id: number = this.activatedRoute.snapshot.params.id;
		const creating: boolean = id == null;

		if (!creating) {
			this.productsService.getIngredientsInProduct(id).subscribe(
				(response) => {
					this.ingredients.forEach((ingredient, index) => {
						for (const ingredientInProduct of response) {
							if (ingredient.id == ingredientInProduct.idIngredient)
								this.spendingAmounts[index] = ingredientInProduct.spendingAmount;
						}
					});

					// Chart
					this.inputAmountEvent();
				},
				(error) => {
					throw new Error(error);
				}
			);
		}
	}

	// Html functions
	public inputAmountEvent(): void {
		this.inputAmount.emit(null);
	}

	public focusoutSpendingAmount(index: number) {
		if (this.spendingAmounts[index] < 0) {
			this.spendingAmounts[index] = 0;
			this.inputAmountEvent();
		}
	}

	// Public functions to parents
	public createProductWithIngredientes(product: Product): void {
		var productWithIngredients: ProductWithIngredients = this.getProductWithIngredients(
			product
		);

		this.productsService.createProduct(productWithIngredients).subscribe(
			(response) => {
				this.router.navigate(['company/products']);
			},
			(error) => console.error(error)
		);
	}

	public updateProduct(product: Product): void {
		var productWithIngredients: ProductWithIngredients = this.getProductWithIngredients(
			product
		);

		this.productsService.updateProduct(productWithIngredients).subscribe(
			(response) => {
				this.router.navigate(['company/products']);
			},
			(error) => console.error(error)
		);
	}

	private getProductWithIngredients(product: Product): ProductWithIngredients {
		var productWithIngredients: ProductWithIngredients = {
			id: product.id != null ? product.id : undefined,
			idCategory: product.idCategory,
			name: product.name,
			price: product.price,
			ingredients: new Array<IngredientInProduct>(0)
		};

		this.spendingAmounts.forEach((spendingAmount, index) => {
			if (spendingAmount > 0) {
				productWithIngredients.ingredients.push({
					idProduct: product.id != null ? product.id : undefined,
					idIngredient: this.ingredients[index].id,
					spendingAmount: spendingAmount
				} as IngredientInProduct);
			}
		});

		return productWithIngredients;
	}
}

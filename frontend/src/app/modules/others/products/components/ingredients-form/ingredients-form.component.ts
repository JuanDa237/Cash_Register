import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	OnInit,
	Output,
	ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IngredientsService } from '@modules/others/ingredients/services';
import { Ingredient, IngredientInProduct } from '@modules/others/ingredients/models';

import { ProductsService } from '../../services';

import { TableComponent } from '@modules/others/app-common/components';
import { Product, ProductWithIngredients } from '../../models';

// Libs
import { Sweet } from '@modules/others/app-common/libs';

@Component({
	selector: 'app-ingredients-form',
	templateUrl: './ingredients-form.component.html',
	changeDetection: ChangeDetectionStrategy.Default
})
export class IngredientsFormComponent implements OnInit {
	public ingredients: Ingredient[];
	public spendingAmounts: number[];

	public loading: boolean;

	@ViewChild(TableComponent)
	private table!: TableComponent;

	@Output()
	public inputAmount: EventEmitter<null>;

	private sweet: Sweet;

	constructor(
		private ingredientsService: IngredientsService,
		private productsService: ProductsService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private ref: ChangeDetectorRef
	) {
		this.ingredients = new Array<Ingredient>(0);
		this.spendingAmounts = new Array<number>(0);

		this.loading = true;

		this.inputAmount = new EventEmitter<null>();
		this.sweet = new Sweet();
	}

	ngOnInit(): void {
		this.getIngredients();
	}

	// Private functions
	private getIngredients(): void {
		this.ingredientsService.getIngredients().subscribe(
			(response) => {
				this.ingredients = response;
				this.ref.markForCheck();
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
		var id: number | null = this.activatedRoute.snapshot.params.id;

		if (id == null) {
			id = Number(this.activatedRoute.snapshot.paramMap.get('from'));
			if (id == 0) id = null;
		}

		if (id != null) {
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
				this.sweet.created('Se creo el producto satisfactoriamente');
			},
			(error) => {
				this.sweet.error('Ocurrio un error');
				throw new Error(error);
			}
		);
	}

	public updateProduct(product: Product): void {
		var productWithIngredients: ProductWithIngredients = this.getProductWithIngredients(
			product
		);

		this.productsService.updateProduct(productWithIngredients).subscribe(
			(response) => {
				this.router.navigate(['company/products']);
				this.sweet.created('Se edito el producto satisfactoriamente');
			},
			(error) => {
				this.sweet.error('Ocurrio un error');
				throw new Error(error);
			}
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

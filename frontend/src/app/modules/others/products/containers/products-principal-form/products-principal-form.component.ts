import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../services';
import {
	ProductsFormComponent,
	UtilityChartComponent,
	IngredientsFormComponent
} from '../../components/index';
import { Product } from '../../models';

@Component({
	selector: 'app-products-principal-form',
	templateUrl: './products-principal-form.component.html'
})
export class ProductsPrincipalFormComponent {
	public creating: boolean;
	public invalidForm: boolean;

	@ViewChild(ProductsFormComponent)
	public formChild!: ProductsFormComponent;

	@ViewChild(IngredientsFormComponent)
	public ingredientsChild!: IngredientsFormComponent;

	@ViewChild(UtilityChartComponent)
	public chartChild!: UtilityChartComponent;

	constructor(private productsService: ProductsService, private router: Router) {
		this.creating = true;
		this.invalidForm = true;
	}

	public createOrUpdateProduct(): void {
		this.creating ? this.createProduct() : this.updateProduct();
	}

	private createProduct(): void {
		const product: Product = this.formChild.getProductValues();

		if (this.validateProduct(product)) {
			this.productsService.saveProduct(product).subscribe(
				(response) => {
					var id: number = response.id;

					this.ingredientsChild.createIngredientsInProduct(id);
					this.router.navigate(['company/products']);
				},
				(error) => {
					throw new Error(error);
				}
			);
		}
	}

	private updateProduct(): void {
		const product: Product = this.formChild.getProductValues();

		if (this.validateProduct(product)) {
			this.productsService.updateProduct(product).subscribe(
				(resolve) => {
					this.ingredientsChild.updateIngredientsInProduct(product.id);
				},
				(error) => {
					throw new Error(error);
				}
			);
			this.router.navigate(['company/products']);
		}
	}

	public deleteProduct(): void {
		const product: Product = this.formChild.getProductValues();

		this.productsService.deleteProduct(product.id).subscribe(
			(resolve) => {
				this.router.navigate(['company/products']);
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	//Chart
	public actualizeUtility(): void {
		const product: Product = this.formChild.getProductValues();

		this.chartChild.actualizeUtility(
			this.ingredientsChild.ingredients,
			this.ingredientsChild.spendingAmount,
			product.price
		);
	}

	//Private Methods
	private validateProduct(product: Product): boolean {
		product.name = product.name.trim();

		return product.name.length >= 1;
	}
}

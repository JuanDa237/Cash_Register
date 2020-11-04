import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../models';
import { ProductsService } from '../../services';
import {
	ProductsFormComponent,
	UtilityChartComponent,
	IngredientsFormComponent
} from '../../components/index';

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

	private async createProduct(): Promise<void> {
		const product: Product = this.formChild.getProductValues();

		if (this.validateProduct(product)) {
			this.ingredientsChild.createProductWithIngredientes(product);
		}
	}

	private async updateProduct(): Promise<void> {
		const product: Product = this.formChild.getProductValues();

		if (this.validateProduct(product)) {
			this.ingredientsChild.updateProduct(product);
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

	// Chart
	public actualizeUtility(): void {
		const product: Product = this.formChild.getProductValues();

		this.chartChild.actualizeUtility(
			this.ingredientsChild.ingredients,
			this.ingredientsChild.spendingAmounts,
			product.price
		);
	}

	// Private Methods
	private validateProduct(product: Product): boolean {
		product.name = product.name.trim();

		return product.name.length >= 1;
	}
}

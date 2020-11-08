import {
	AfterContentInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ViewChild
} from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../models';
import { ProductsService } from '../../services';
import {
	ProductsFormComponent,
	UtilityChartComponent,
	IngredientsFormComponent
} from '../../components/index';

// Libs
import { Sweet } from '@modules/others/app-common/libs';

@Component({
	selector: 'app-products-principal-form',
	templateUrl: './products-principal-form.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsPrincipalFormComponent implements AfterContentInit {
	public creating: boolean;
	public invalidForm: boolean;

	@ViewChild(ProductsFormComponent)
	public formChild!: ProductsFormComponent;

	@ViewChild(IngredientsFormComponent)
	public ingredientsChild!: IngredientsFormComponent;

	@ViewChild(UtilityChartComponent)
	public chartChild!: UtilityChartComponent;

	private sweet: Sweet;

	constructor(
		private productsService: ProductsService,
		private router: Router,
		private ref: ChangeDetectorRef
	) {
		this.creating = true;
		this.invalidForm = true;
		this.sweet = new Sweet();
	}

	ngAfterContentInit(): void {
		this.ref.markForCheck();
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

	public async deleteProduct(): Promise<void> {
		const product: Product = this.formChild.getProductValues();

		if (await this.sweet.delete('¿Estas seguro de eliminar el producto?')) {
			this.productsService.deleteProduct(product.id).subscribe(
				(resolve) => {
					this.router.navigate(['company/products']);
					this.sweet.deleted('Se elimino el producto satisfactoriamente');
				},
				(error) => {
					this.sweet.deleted('Ocurrio un error');
					throw new Error(error);
				}
			);
		}
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

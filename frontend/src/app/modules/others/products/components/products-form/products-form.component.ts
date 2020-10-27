import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Product } from '../../models';
import { Category } from '@modules/others/categories/models';
import { CategoriesService } from '@modules/others/categories/services/categories.service';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services';

@Component({
	selector: 'app-products-form',
	templateUrl: './products-form.component.html'
})
export class ProductsFormComponent implements OnInit {
	public productForm: FormGroup;

	@Output()
	private onSubmitEvent: EventEmitter<null>;

	@Output()
	private creatingForm: EventEmitter<boolean>;

	@Output()
	private invalidForm: EventEmitter<boolean>;

	@Output()
	public inputPrice: EventEmitter<number>;

	public creating: boolean;
	public categories: Array<Category>;

	constructor(
		private categoriesService: CategoriesService,
		private productsService: ProductsService,
		private activatedRoute: ActivatedRoute
	) {
		this.productForm = new FormGroup({
			id: new FormControl(null),
			idCategory: new FormControl(null, Validators.required),
			name: new FormControl(null, [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(30)
			]),
			price: new FormControl(0, Validators.required)
		});

		this.onSubmitEvent = new EventEmitter<null>();
		this.creatingForm = new EventEmitter<boolean>();
		this.invalidForm = new EventEmitter<boolean>();
		this.inputPrice = new EventEmitter<number>();

		this.creating = true;
		this.categories = new Array<Category>(0);
	}

	ngOnInit(): void {
		this.productForm.valueChanges.subscribe(() => {
			this.invalidForm.emit(this.productForm.invalid);
		});

		this.getUrlParams();
		this.getCategories();
	}

	//Private methods
	private getUrlParams(): void {
		const id: number = this.activatedRoute.snapshot.params.id;
		this.creating = id == null;

		this.creatingForm.emit(this.creating);

		if (!this.creating) {
			this.productsService.getProduct(id).subscribe(
				(response) => {
					this.setProductValues(response);
				},
				(error) => {
					throw new Error(error);
				}
			);
		}
	}

	private getCategories(): void {
		this.categoriesService.getCategories().subscribe(
			(response) => {
				this.categories = response;
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	//Component methods

	public submitEvent(): void {
		if (this.productForm.valid) this.onSubmitEvent.emit(null);
	}

	public inputPriceEvent(): void {
		this.inputPrice.emit(this.productForm.value.price);
	}

	//Public methods

	public getProductValues(): Product {
		return this.productForm.value as Product;
	}

	public setProductValues(product: Product): void {
		this.productForm.patchValue({
			id: product.id,
			idCategory: product.idCategory,
			name: product.name,
			price: product.price
		});
	}
}

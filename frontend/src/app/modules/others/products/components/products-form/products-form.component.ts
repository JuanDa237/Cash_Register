import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Category } from '@modules/others/categories/models';
import { CategoriesService } from '@modules/others/categories/services/categories.service';

import { Product, ProductIngredientsFile } from '../../models';
import { ProductsService } from '../../services';

import { environment } from '@enviroment/environment';

@Component({
	selector: 'app-products-form',
	templateUrl: './products-form.component.html',
	styleUrls: ['./products-form.component.scss']
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

	private selectedFile: File | null;
	public imagePreview: ArrayBuffer | string | null;

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
			description: new FormControl('', Validators.maxLength(255)),
			price: new FormControl(0, Validators.required),
			image: new FormControl(null)
		});

		this.onSubmitEvent = new EventEmitter<null>();
		this.creatingForm = new EventEmitter<boolean>();
		this.invalidForm = new EventEmitter<boolean>();
		this.inputPrice = new EventEmitter<number>();

		this.creating = true;
		this.categories = new Array<Category>(0);

		this.selectedFile = null;
		this.imagePreview = '';
	}

	ngOnInit(): void {
		this.productForm.valueChanges.subscribe(() => {
			this.invalidForm.emit(this.productForm.invalid);
		});

		this.getUrlParams();
		this.getCategories();
	}

	// Private methods
	private getUrlParams(): void {
		var id: number | null = this.activatedRoute.snapshot.params.id;
		this.creating = id == null;

		this.creatingForm.emit(this.creating);

		if (id == null) {
			id = Number(this.activatedRoute.snapshot.paramMap.get('from'));
			if (id == 0) id = null;
		}

		if (id != null) {
			this.productsService.getProduct(id).subscribe(
				(response) => {
					if (this.creating) {
						response.image = '';
					}

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

	// Component methods

	public submitEvent(): void {
		if (this.productForm.valid) this.onSubmitEvent.emit(null);
	}

	public inputPriceEvent(): void {
		this.inputPrice.emit(this.productForm.value.price);
	}

	// Public methods

	public getProductValues(): ProductIngredientsFile {
		var product: ProductIngredientsFile = this.productForm.value as ProductIngredientsFile;
		product.imageFile = this.selectedFile;
		return product;
	}

	public setProductValues(product: Product): void {
		this.productForm.patchValue({
			id: product.id,
			idCategory: product.idCategory,
			name: product.name,
			price: product.price,
			description: product.description
		});

		this.imagePreview = environment.apiUrl + product.image;
	}

	public onFileChange(event: any): void {
		if (event.target.files && event.target.files[0]) {
			this.selectedFile = event.target.files[0];

			// Image preview
			const reader = new FileReader();
			reader.onload = (e) => (this.imagePreview = reader.result);
			reader.readAsDataURL(this.selectedFile as Blob);
		}
	}

	// Getters

	get id() {
		return this.productForm.get('id');
	}

	get idCategory() {
		return this.productForm.get('idCategory');
	}

	get name() {
		return this.productForm.get('name');
	}

	get description() {
		return this.productForm.get('description');
	}

	get price() {
		return this.productForm.get('price');
	}

	get image() {
		return this.productForm.get('image');
	}
}

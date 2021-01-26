import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '@modules/others/app-common/components';
import { CategoriesFormComponent } from '../../components';

// Models
import { Category, createEmptyCategory } from '../../models/index';

// Services
import { CategoriesService } from '../../services/index';

// Libs
import { Sweet } from '@modules/others/app-common/libs';

@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {
	public categories: Array<Category>;
	public creating: boolean;

	public loading: boolean;

	public invalidForm: boolean;

	@ViewChild(CategoriesFormComponent)
	public formChild!: CategoriesFormComponent;

	@ViewChild(TableComponent)
	private table!: TableComponent;

	private sweet: Sweet;

	constructor(private categoriesService: CategoriesService) {
		this.categories = new Array<Category>(0);
		this.creating = false;
		this.invalidForm = false;
		this.loading = true;
		this.sweet = new Sweet();
	}

	ngOnInit(): void {
		this.getCategories();
	}

	private getCategories(): void {
		this.categoriesService.getCategories().subscribe(
			(response) => {
				this.categories = response;
				this.loading = false;
				this.table.renderTable();
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	// Html methods

	public changeModal(category: Category | null): void {
		if ((this.creating = category == null))
			this.formChild.setCategoryValues(createEmptyCategory());
		else this.formChild.setCategoryValues(category);
	}

	// Categories methods
	public createOrUpdateCategory(): void {
		this.creating ? this.createCategory() : this.updateCategory();
	}

	private createCategory(): void {
		var category: Category = this.formChild.getCategoryValues();

		if (this.validateCategory(category)) {
			this.categoriesService.saveCategory(category).subscribe(
				(response) => {
					category.id = response.id;
					this.categories.push(category);

					// Events
					this.table.rerenderTable();
					this.sweet.created('Se creo la categoria satisfactoriamente');
				},
				(error) => {
					this.sweet.error('Ocurrio un error');
					throw new Error(error);
				}
			);
		}
	}

	private async updateCategory(): Promise<void> {
		const category: Category = this.formChild.getCategoryValues();

		if (this.validateCategory(category)) {
			this.categoriesService.updateCategory(category).subscribe(
				(response) => {
					const index: number = this.categories
						.map((x) => {
							return x.id;
						})
						.indexOf(category.id);
					this.categories[index] = category;

					// Events
					this.table.rerenderTable();
					this.sweet.created('Se edito la categoria satisfactoriamente');
				},
				(error) => {
					this.sweet.error('Ocurrio un error');
					throw new Error(error);
				}
			);
		}
	}

	public async deleteCategory(category: Category): Promise<void> {
		if (
			this.validateCategory(category) &&
			(await this.sweet.delete('¿Estas seguro de eliminar la categoria?'))
		) {
			this.categoriesService.deleteCategory(category.id).subscribe(
				(response) => {
					const index: number = this.categories
						.map((x) => {
							return x.id;
						})
						.indexOf(category.id);
					this.categories.splice(index, 1);

					// Events
					this.table.rerenderTable();
					this.sweet.deleted('Se elimino la categoria satisfactoriamente');
				},
				(error) => {
					this.sweet.error('Ocurrio un error');
					throw new Error(error);
				}
			);
		}
	}

	// Auxiliary methods

	private validateCategory(category: Category): boolean {
		return (
			category != null &&
			category.id != null &&
			category.name.trim() != '' &&
			category.name != null
		);
	}
}

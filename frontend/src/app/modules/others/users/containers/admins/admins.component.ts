import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '@app/modules/others/app-common/components';
import { Sweet } from '@app/modules/others/app-common/libs';
import { UserService } from '@app/modules/others/configuration/services';
import { AdminsFormComponent } from '../../components';
import { Admin, createEmptyAdmin } from '../../model';

@Component({
	selector: 'app-admins',
	templateUrl: './admins.component.html'
})
export class AdminsComponent implements OnInit {
	public admins: Admin[];
	public creating: boolean;

	public loading: boolean;

	public invalidForm: boolean;

	@ViewChild(AdminsFormComponent)
	public formChild!: AdminsFormComponent;

	@ViewChild(TableComponent)
	private table!: TableComponent;

	private sweet: Sweet;

	constructor(private userService: UserService) {
		this.admins = new Array<Admin>(0);
		this.creating = false;
		this.invalidForm = false;
		this.loading = true;
		this.sweet = new Sweet();
	}

	ngOnInit(): void {
		this.getAdmins();
	}

	private getAdmins(): void {
		this.userService.getAdmins().subscribe(
			(response) => {
				this.admins = response;
				this.loading = false;
				this.table.renderTable();
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	// Html methods

	public changeModal(admin: any | null): void {
		if ((this.creating = admin == null))
			this.formChild.setAdminValues(createEmptyAdmin(), false);
		else this.formChild.setAdminValues(admin, true);
	}

	// Categories methods
	public createOrUpdateAdmin(): void {
		this.creating ? this.createAdmin() : this.updateAdmin();
	}

	private createAdmin(): void {
		console.log('creo');
		// var category: Category = this.formChild.getCategoryValues();
		// if (this.validateCategory(category)) {
		// 	this.categoriesService.saveCategory(category).subscribe(
		// 		(response) => {
		// 			category.id = response.id;
		// 			this.categories.push(category);
		// 			// Events
		// 			this.table.rerenderTable();
		// 			this.sweet.created('Se creo la categoria satisfactoriamente');
		// 		},
		// 		(error) => {
		// 			this.sweet.error('Ocurrio un error');
		// 			throw new Error(error);
		// 		}
		// 	);
		// }
	}

	private async updateAdmin(): Promise<void> {
		console.log('edito');
		// 	const category: Category = this.formChild.getCategoryValues();
		// 	if (this.validateCategory(category)) {
		// 		this.categoriesService.updateCategory(category).subscribe(
		// 			(response) => {
		// 				const index: number = this.categories
		// 					.map((x) => {
		// 						return x.id;
		// 					})
		// 					.indexOf(category.id);
		// 				this.categories[index] = category;
		// 				// Events
		// 				this.table.rerenderTable();
		// 				this.sweet.created('Se edito la categoria satisfactoriamente');
		// 			},
		// 			(error) => {
		// 				this.sweet.error('Ocurrio un error');
		// 				throw new Error(error);
		// 			}
		// 		);
		// 	}
		// }
		// public async deleteCategory(category: Category): Promise<void> {
		// 	if (
		// 		this.validateCategory(category) &&
		// 		(await this.sweet.delete('¿Estas seguro de eliminar la categoria?'))
		// 	) {
		// 		this.categoriesService.deleteCategory(category.id).subscribe(
		// 			(response) => {
		// 				const index: number = this.categories
		// 					.map((x) => {
		// 						return x.id;
		// 					})
		// 					.indexOf(category.id);
		// 				this.categories.splice(index, 1);
		// 				// Events
		// 				this.table.rerenderTable();
		// 				this.sweet.deleted('Se elimino la categoria satisfactoriamente');
		// 			},
		// 			(error) => {
		// 				this.sweet.error('Ocurrio un error');
		// 				throw new Error(error);
		// 			}
		// 		);
		// 	}
	}
	public async deleteAdmin(admin: any): Promise<void> {
		console.log('elimino');
		// if (
		// 	this.validateCategory(category) &&
		// 	(await this.sweet.delete('¿Estas seguro de eliminar la categoria?'))
		// ) {
		// 	this.categoriesService.deleteCategory(category.id).subscribe(
		// 		(response) => {
		// 			const index: number = this.categories
		// 				.map((x) => {
		// 					return x.id;
		// 				})
		// 				.indexOf(category.id);
		// 			this.categories.splice(index, 1);
		// 			// Events
		// 			this.table.rerenderTable();
		// 			this.sweet.deleted('Se elimino la categoria satisfactoriamente');
		// 		},
		// 		(error) => {
		// 			this.sweet.error('Ocurrio un error');
		// 			throw new Error(error);
		// 		}
		// 	);
		// }
	}

	// Auxiliary methods

	private validateAdmin(admin: any): boolean {
		return true;
		// return (
		// 	category != null &&
		// 	category.id != null &&
		// 	category.name.trim() != '' &&
		// 	category.name != null
		// );
	}
}
